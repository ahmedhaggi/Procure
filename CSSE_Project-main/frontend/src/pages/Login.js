import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import NavBar from "../components/navbar";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Dispatch a showLoading action to display loading indicator
      dispatch(showLoading());

      // Send a POST request to the login API endpoint with form values
      const response = await axios.post("http://localhost:5000/api/user/login", values);

      // Dispatch a hideLoading action to hide the loading indicator
      dispatch(hideLoading());

      if (response.data.success) {
        // If login is successful, show success toast and store the token
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);

        // Navigate to the admin page
        navigate("/admin");
      } else {
        // If login fails, show an error toast
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle errors, dispatch hideLoading, and show an error toast
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <NavBar />
      <div className="authentication">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Welcome Back</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>

            <Button className="primary-button my-2 full-width-button" htmlType="submit">
              LOGIN
            </Button>

            <Link to="/register" className="anchor mt-2">
              CLICK HERE TO REGISTER
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
