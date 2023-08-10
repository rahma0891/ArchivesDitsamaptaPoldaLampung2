import { useState } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useHttp from '../hooks/use-http';

const AddSurat = (props) => {
   const [form] = Form.useForm();
   const [uploadImage, setUploadImage] = useState(null);
   const { isLoading, sendRequest } = useHttp();

   const onCancelModal = () => {
      form.resetFields();
      props.onCancel();
   };

   const showMessage = () => {
      message.success('Berhasil menambahkan surat');
   };


   const handleSubmit = async () => {
      try {
         const values = await form.validateFields();
         sendRequest({
            url: props.url,
            method: "POST",
            body: {
               no: values.no,
               pengirim: values.pengirim,
               tanggalSurat: values.tanggalSurat,
               tanggalDiterima: values.tanggalDiterima,
               perihal: values.perihal,
               file_url: uploadImage,
            },
            headers: {
               'Content-Type': "multipart/form-data",
            },
         },
            () => {
               showMessage()
               onCancelModal();
               props.getData();
            }
         )
      } catch (errorInfo) {
         console.log('Failed:', errorInfo);
      }
   };

   const handleImageUpload = (info) => {
      setUploadImage(info.file)
   };

   const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
         file.preview = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
         });
      }

      // Show preview modal
      Modal.info({
         title: file.name,
         content: (
            <img
               alt="preview"
               style={{ width: '100%' }}
               src={file.url || file.preview}
            />
         ),
      });
   };

   return (
      <Modal
         okText="Simpan"
         cancelText="Batal"
         onOk={handleSubmit}
         open={props.show}
         onCancel={onCancelModal}
         okButtonProps={{ loading: isLoading }}
      >
         <Form form={form} layout="vertical">
            <Form.Item
               name="no"
               label="No Surat"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="pengirim"
               label="pengirim"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="tanggalSurat"
               label="Tanggal Surat(dd-mm-yyyy)"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="tanggalDiterima"
               label="Tanggal Diterima(dd-mm-yyyy)"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="perihal"
               label="Perihal"
               rules={[{ required: true, message: "Harap diisi" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item name="image" label="File"
               rules={[
                  {
                     validator: (_, value) =>
                        value && value.fileList && value.fileList.length > 0
                           ? Promise.resolve()
                           : Promise.reject(new Error('Please upload an image')),
                  },
                  {
                     required: true,
                  }
               ]}
            >
               <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  beforeUpload={() => false}
                  onChange={handleImageUpload}
                  onPreview={handlePreview}
                  maxCount={1}
               >
                  <div>
                     <PlusOutlined />
                     <div style={{ marginTop: 8 }}>upload</div>
                  </div>
               </Upload>
            </Form.Item>
         </Form>
      </Modal >
   );
};

export default AddSurat;