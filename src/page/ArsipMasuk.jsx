import { Button, Popconfirm, Space, Table, Tag, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './ArsipMasuk.css'
import useHttp from '../hooks/use-http';
import { useCallback, useEffect, useState } from 'react';
import AddSurat from '../components/AddSurat';
import EditSurat from '../components/EditSurat';
import HeadMain from '../components/HeadMain';


const ArsipMasuk = () => {
   const { isLoading, sendRequest } = useHttp();
   const [arsip, setArsip] = useState([]);
   const [dataId, setDataId] = useState(null);
   const [search, setSearch] = useState('');
   const [isAddSurat, setIsAddSurat] = useState(false);
   const [isEditSurat, setIsEditSurat] = useState(false);


   const onCancel = () => {
      setIsAddSurat(false);
      setIsEditSurat(false);
      setDataId(null);
   }


   const getArsipMasuk = useCallback(async () => {
      try {
         sendRequest({
            url: "/api/v1/suratMasuk",
            method: "GET",
         },
            (data) => {
               setArsip(data.data);
            }
         )
      } catch (error) {
         console.log(error);
      }
   }, [sendRequest]);

   const handleDelete = (id) => {
      sendRequest({
         url: `/api/v1/suratMasuk/${id}`,
         method: "DELETE"
      },
         () => {
            message.success("Berhasil menghapus data");
            getArsipMasuk();
         }
      )
   }


   useEffect(() => {
      getArsipMasuk();
   }, [getArsipMasuk]);


   const columns = [
      {
         title: "No",
         dataIndex: "index",
         align: "left",
         width: window.innerWidth > 800 ? 70 : 50,
      },
      { title: "No surat", dataIndex: "no", align: "left" },
      { title: "Pengirim", dataIndex: "pengirim", align: "left" },
      { title: "Tanggal surat", dataIndex: "tanggalSurat", align: "left" },
      { title: "Tanggal Diterima", dataIndex: "tanggalDiterima", align: "left" },
      { title: "Perihal", dataIndex: "perihal", align: "left" },
      {
         title: "Aksi",
         dataIndex: "id",
         align: "center",
         render: (_, record) => {
            return (
               <Space>
                  <Popconfirm
                     title="Yakin ingin menghapus data?"
                     okText="Delete"
                     cancelText="Batal"
                     style={{ cursor: "pointer" }}
                     onConfirm={() => {
                        handleDelete(dataId);
                     }}
                  >
                     <Tag
                        color="red"
                        onClick={() => {
                           setDataId(record.id);
                        }}
                        style={{ cursor: "pointer" }}
                     >
                        Hapus
                     </Tag>
                  </Popconfirm>
                  <Tag
                     style={{ cursor: "pointer" }}
                     color="orange"
                     onClick={() => {
                        setDataId(record.id);
                        setIsEditSurat(true);
                     }}
                  >
                     Ubah
                  </Tag>
                  <Tag
                     style={{ cursor: "pointer" }}
                     color="blue"
                     onClick={() => {
                        window.open(record.file_url)
                     }}
                  >
                     Detail
                  </Tag>
               </Space>
            );
         },
      },
   ]

   const handleSearch = (e) => {
      setSearch(e.target.value);
   }

   const arsipFilter = arsip.filter((item) => {
      return item.pengirim.toLowerCase().includes(search.toLowerCase());
   });

   const dataSources = arsipFilter.map((item, index) => {
      return {
         index: index + 1,
         id: item.id,
         no: item.no,
         pengirim: item.pengirim,
         tanggalSurat: item.tanggalSurat,
         tanggalDiterima: item.tanggalDiterima,
         perihal: item.perihal,
         file_url: item.file_url,
      };
   });


   return (
      <div className='container' >
         <HeadMain />
         <div className='dashboard-content'>
            <h1 className='dashboard-heading'>Daftar Arsip Masuk</h1>
            <div className="search-box">
               <div>
                  <Button
                     icon={<PlusOutlined />}
                     type='primary'
                     className='add-document-button'
                     onClick={() => { setIsAddSurat(true); }}
                  >Add</Button>
               </div>
               <div>
                  <input type="text" placeholder='Search' className='search-input-item' onChange={handleSearch} />
               </div>
            </div>
            <Table
               size="small"
               tableLayout="auto"
               columns={columns}
               loading={isLoading}
               pagination={false}
               dataSource={dataSources}
               scroll={
                  window.innerHeight < 760
                     ? {
                        y: "50vh",
                        x: 800,
                     }
                     : {
                        y: "55vh",
                        x: 800,
                     }
               }
            />
            <AddSurat
               show={isAddSurat}
               onCancel={onCancel}
               getData={getArsipMasuk}
               url={"/api/v1/suratMasuk"}
            />
            <EditSurat
               id={dataId}
               url={"/api/v1/suratMasuk"}
               show={isEditSurat}
               onCancel={onCancel}
               getData={getArsipMasuk}
            />
         </div>
      </div >
   )
}

export default ArsipMasuk