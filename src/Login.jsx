import axios from 'axios';
import './Login.css';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios({
      url: 'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
      method: 'POST',
      data: values,
    })
      .then((res) => {
        if (res.data.data.tokens.accessToken.token) {
          localStorage.setItem('accessToken', res.data.data.tokens.accessToken.token);
          message.success("Muvaffaqiyatli kiritildi");
          navigate('/city');
        } else {
          message.error("Login yoki Parol noto'g'ri");
        }
      })
      .catch((error) => {
        message.error("Internetga ulanmagansiz");
      });
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-box">
          <Form
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Telefon raqam"
              name="phone_number"
              rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Parol"
              name="password"
              rules={[{ required: true, message: 'Iltimos, parolingizni kiriting!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-btn">
                Kirish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
