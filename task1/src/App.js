import { useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [signupInput, setSignInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      return setError("The email you input is invalid.");
    } 
    else if (!regexPassword.test(signupInput.password)) {
      return setError(
        `The password you entered should between 8 to 15 and contain at least one lowercase letter, 
          one uppercase letter, one numeric digit, and one special character`
      );
    } else if (signupInput.password !== signupInput.confirmPassword) {
      return setError("The passwords don't match. Try again.");
    }
  };

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" data-testid="my-button" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
