import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    const params = {
      username: username,
      email: email,
      password: password,
    };
    fetch("http://localhost:5050/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("access-token", res.token);
      });
  }

  async function handleSubmit(event: HTMLFormElement) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await register();
      navigate("/login");
    } catch {
      setError("Failed to register");
    }
    setLoading(false);
  }

  return (
    <div className="container mt-5 w-100">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit as any}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Register;
