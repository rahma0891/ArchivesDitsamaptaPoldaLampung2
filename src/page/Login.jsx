import logoside from "../assets/logoside.png";
import loginimg from "../assets/login.png";

import { Button, Form, Input, message } from "antd";
import useHttp from "../hooks/use-http";
import Cookies from "js-cookie";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const { isLoading, sendRequest } = useHttp();
  const navigate = useNavigate();

  const showMessage = () => {
    message.success('Login berhasil');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      sendRequest(
        {
          url: "/api/v1/users/login",
          method: "POST",
          body: values,
        },
        (data) => {
          Cookies.set("token", data.token);
          Cookies.set("email", data.data.user.email);
          Cookies.set("id", data.data.user.id);
          console.log(data.data.user)
          Cookies.set('name', data.data.user.name)
          showMessage();
          navigate("/dashboard/statistic");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <a href="#" className="logo">
          ARCHIVES-DITSAMAPTA
        </a>
        <a href="#" className="profile">
          <img src={logoside} alt="logo-polda" />
        </a>
      </header>

      <section className="hero">
        <div className="hero-text">
          <p>Selamat Datang, Silahkan Login !</p>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Harap isi email anda" },
                { type: "email", message: "Email tidak valid" },
              ]}
            >
              <Input className="input-text" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Harap isi password anda" }]}
            >
              <Input.Password className="input-text" placeholder="password" />
            </Form.Item>
            <div className="btn-container">
              <Button
                htmlType="submit"
                className="btn-login"
                loading={isLoading}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
        <div className="hero-img">
          <img src={loginimg} alt="" />
        </div>
      </section>
    </>
  );
};

export default Login;
