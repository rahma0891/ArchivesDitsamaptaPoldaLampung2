import { Space, Table, Tag } from 'antd'
import useHttp from '../hooks/use-http';
import { useCallback, useEffect, useState } from 'react';
import './Pengarsipan.css'
import lambang from '../assets/lambangpolda2.png'
import iconLogin from '../assets/login.png'
import { useLocation } from 'react-router-dom';


const Pengarsipan = () => {
   const { isLoading, sendRequest } = useHttp();
   const [arsip, setArsip] = useState([]);
   const [search, setSearch] = useState('');
   const location = useLocation();
   const data = location.state;

   const getAllArsip = useCallback(async () => {
      try {
         sendRequest({
            url: "/api/v1/arsip",
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

   useEffect(() => {
      getAllArsip();
   }, [getAllArsip]);

   useEffect(() => {
      if (data) {
         setSearch(data.text);
      }
   }, [data])

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
      <div className='arsip-main-content'>
         <div className='arsip-logo-content'>
            <h1>Sistem Informasi
               Pengarsipan POLDA</h1>
            <img src={lambang} alt="Lambang polda 2" />
         </div>
         <div className='arsip-container' >
            <div className='icon-login-item'>
               <img src={iconLogin} alt="gambar icon" />
            </div>
            <div className='dashboard-content'>
               <div className="search-box">
                  <div>
                     <input type="text" placeholder='Search' className='search-input-item' onChange={handleSearch} value={search} />
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
            </div>
         </div >
      </div>
   )
}

export default Pengarsipan