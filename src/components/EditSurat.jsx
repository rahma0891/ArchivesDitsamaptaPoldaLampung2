import { useCallback, useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useHttp from '../hooks/use-http';

const EditSurat = (props) => {
   const [form] = Form.useForm();
   const [newData, setNewData] = useState({});
   const { isLoading, sendRequest } = useHttp();
   const { isLoading: isPosting, sendRequest: postingData } = useHttp();
   const [surat, setSurat] = useState(null);
   const [fileList, setFileList] = useState([])

   const getDetailSurat = useCallback(async () => {
      sendRequest({
         url: `${props.url}/${props.id}`,
         method: "GET",
      }, (data) => {
         setSurat(data.data)
      })
   }, [sendRequest, props.id, props.url])

   useEffect(() => {
      if (props.id) getDetailSurat();
   }, [props.id, getDetailSurat])

   useEffect(() => {
      if (surat) {
         form.setFieldsValue({
            no: surat.no,
            pengirim: surat.pengirim,
            tanggalSurat: surat.tanggalSurat,
            tanggalDiterima: surat.tanggalDiterima,
            perihal: surat.perihal,
         })
         setFileList([{
            uid: '-1',
            name: surat.file_url.split('/')[surat.file_url.split('/').length - 1],
            status: 'done',
            url: surat.file_url,
         }])
      }
   }, [surat, form])


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
            url: `${props.url}/${props.id}`,
            method: "PATCH",
            body: newData,
            headers: {
               'Content-Type': "multipart/form-data",
            },
         },
            () => {
               message.success("Berhasil Mengubah Surat");
               props.getData();
               onCancelModal();
            }
         )
      } catch (errorInfo) {
         console.log('Failed:', errorInfo);
      }
   };

   const handleChange = ({ fileList: newFileList }) => {
      setFileList(newFileList)
      setNewData({ ...newData, photo_url: newFileList[0].originFileObj })
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
         okButtonProps={{ loading: isPosting }}
      >
         {isLoading && <Skeleton active />}
         {!isLoading && (<Form form={form} layout="vertical">
            <Form.Item
               name="no"
               label="No Surat"
            >
               <Input onChange={({ target: { value } }) => (newData["no"] = value)} />
            </Form.Item>
            <Form.Item name="pengirim" label="Pengirim" >
               <Input onChange={({ target: { value } }) => (newData["pengirim"] = value)} />
            </Form.Item>
            <Form.Item name="tanggalSurat" label="Tanggal Surat(dd-mm-yyyy)" >
               <Input onChange={({ target: { value } }) => (newData["tanggalSurat"] = value)} />
            </Form.Item>
            <Form.Item name="tanggalDiterima" label="Tanggal Diterima(dd-mm-yyyy)" >
               <Input onChange={({ target: { value } }) => (newData["tanggalDiterima"] = value)} />
            </Form.Item>
            <Form.Item name="perihal" label="Perihal" >
               <Input onChange={({ target: { value } }) => (newData["perihal"] = value)} />
            </Form.Item>
            <Form.Item name="image" label="File Surat"
            >
               <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  beforeUpload={() => false}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  maxCount={1}
                  fileList={fileList}
               >
                  <div>
                     <PlusOutlined />
                     <div style={{ marginTop: 8 }}>upload</div>
                  </div>
               </Upload>
            </Form.Item>
         </Form>)}
      </Modal >
   );
};

export default EditSurat;