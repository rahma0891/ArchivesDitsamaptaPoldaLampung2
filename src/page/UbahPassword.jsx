import { Button, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import useHttp from "../hooks/use-http";

const UbahPassword = () => {
   const [form] = Form.useForm();
   const token = Cookies.get("token");
   const { isLoading, sendRequest } = useHttp();

   const showMessage = () => {
      message.success('Password berhasil diubah');
   };

   const handleSubmit = async () => {
      try {
         const values = await form.validateFields();
         sendRequest({
            url: '/api/v1/users/updateMyPassword',
            method: "PATCH",
            body: {
               passwordCurrent: values.passwordCurrent,
               password: values.password,
            },
            headers: {
               'Content-Type': "application/json",
               'Authorization': `Bearer ${token}`
            },
         },
            () => {
               showMessage()
               form.resetFields()
            }
         )
      } catch (errorInfo) {
         console.log('Failed:', errorInfo);
      }
   };


   return (
      <div className="dashboard-content">
         <h1 className='dashboard-heading'>Ubah Password</h1>
         <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
               name="passwordCurrent"
               label="Password Lama"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input.Password />
            </Form.Item>
            <Form.Item
               name="password"
               label="Password Baru"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input.Password />
            </Form.Item>
            <Form.Item
               name="passwordConfirm"
               label="Konfirmasi Password"
               rules={[
                  {
                     required: true,
                     message: 'Harap diisi',
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                           return Promise.resolve();
                        }
                        return Promise.reject(new Error('Konfirmasi password harus sama dengan password'));
                     },
                  }),
               ]}
            >
               <Input.Password />
            </Form.Item>
            <Button type='primary'
               htmlType="submit"
               loading={isLoading}
            >Update</Button>
         </Form>
      </div>
   )
}

export default UbahPassword