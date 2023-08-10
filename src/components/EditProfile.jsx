import { useCallback, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Skeleton } from 'antd';
import useHttp from '../hooks/use-http';
import Cookies from 'js-cookie';

const EditProfile = (props) => {
   const [form] = Form.useForm();
   const [newData, setNewData] = useState({});
   const { isLoading, sendRequest } = useHttp();
   const { isLoading: isPosting, sendRequest: postingData } = useHttp();
   const [user, setProfile] = useState({});


   const getDetailUser = useCallback(async () => {
      sendRequest({
         url: `/api/v1/users/${props.id}`,
         method: "GET",
      }, (data) => {
         setProfile(data.data)
      })
   }, [sendRequest, props.id])

   useEffect(() => {
      if (props.id) getDetailUser();
   }, [props.id, getDetailUser])

   useEffect(() => {
      if (user) {
         form.setFieldsValue({
            name: user.name,
            email: user.email,
         })
      }
   }, [user, form])


   const onCancelModal = () => {
      form.resetFields();
      setNewData({});
      props.onCancel();
   };

   const handleSubmit = async () => {
      try {
         if (Object.keys(newData).length === 0) {
            alert('Nothing has changed');
            return;
         }
         postingData({
            url: `/api/v1/users/updateMe`,
            method: "PATCH",
            body: newData,
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${Cookies.get('token')}`,
            },
         },
            () => {
               message.success("Berhasil Mengubah profle");
               props.getData();
               onCancelModal();
            }
         )
      } catch (errorInfo) {
         console.log('Failed:', errorInfo);
      }
   };


   return (
      <Modal
         okText="Simpan"
         cancelText="Batal"
         onOk={handleSubmit}
         open={props.show}
         onCancel={onCancelModal}
         okButtonProps={{ loading: isPosting }}
      >
         {isLoading && <Skeleton active />}
         {!isLoading && (<Form form={form} layout="vertical">
            <Form.Item name="name" label="Nama" >
               <Input onChange={({ target: { value } }) => (newData["name"] = value)} />
            </Form.Item>
            <Form.Item name="email" label="Email" >
               <Input onChange={({ target: { value } }) => (newData["Email"] = value)} />
            </Form.Item>
         </Form>)}
      </Modal >
   );
};

export default EditProfile;