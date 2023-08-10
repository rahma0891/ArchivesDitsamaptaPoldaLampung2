import { useCallback, useEffect, useState } from 'react'
import HeadMain from '../components/HeadMain'
import useHttp from '../hooks/use-http'
import { Skeleton } from 'antd'

const Dashboard = () => {
   const [dashboard, setDashboard] = useState([])
   const { isLoading, sendRequest } = useHttp()


   const getDashboard = useCallback(async () => {
      try {
         sendRequest({
            url: "/api/v1/arsip/dashboard",
            method: "GET",
         },
            (data) => {
               setDashboard(data);
            }
         )
      } catch (error) {
         console.log(error);
      }
   }, [sendRequest]);

   useEffect(() => {
      getDashboard();
   }, [getDashboard]);

   return (
      <div className="container">
         <HeadMain />
         {isLoading ? <Skeleton active /> : (<>
            <div className="card-menu">
               <div className="card">
                  <div className="card-decor" style={{ backgroundColor: '#884a39' }}></div>
                  <div className="card-body">
                     <h2 style={{ color: '#884a39' }}>Jumlah Arsip Masuk</h2>
                     <p>{dashboard.countSuratMasuk}</p>
                  </div>
               </div>
               <div className="card">
                  <div className="card-decor" style={{ backgroundColor: '#c38154' }}></div>
                  <div className="card-body">
                     <h2 style={{ color: '#c38154' }}>Jumlah Arsip Keluar</h2>
                     <p>{dashboard.countSuratKeluar}</p>
                  </div>
               </div>
               <div className="card">
                  <div className="card-decor" style={{ backgroundColor: '#ffc26f' }}></div>
                  <div className="card-body">
                     <h2 style={{ color: '#ffc26f' }}>Jumlah File</h2>
                     <p>{dashboard.sumSurat}</p>
                  </div>
               </div>
            </div>
            <div className="card-stats">
               <div className="card-2">
                  <div className="card-decor" style={{ backgroundColor: '#ffcc00' }}></div>
                  <div className="card-body">
                     <figure className="pie-chart">
                        <h2 style={{ color: '#ffcc00' }}>Statistik Data Perbulan</h2>
                        <figcaption>
                           Januari<span style={{ color: '#4e79a7' }}></span><br />
                           Februari<span style={{ color: '#f28e2c' }}></span><br />
                           Maret<span style={{ color: '#e15759' }}></span><br />
                           April<span style={{ color: '#76b7b2' }}></span><br />
                           Mei<span style={{ color: '#59a14f' }}></span><br />
                           Juni<span style={{ color: '#ffd84d' }}></span><br />
                           Juli<span style={{ color: '#af7aa1' }}></span><br />
                           Agustus<span style={{ color: '#ff9da7' }}></span><br />
                           Septembet<span style={{ color: '#9c755f' }}></span><br />
                           Oktober<span style={{ color: '#bab0ab' }}></span><br />
                           November<span style={{ color: '#253a50' }}></span><br />
                           Desember<span style={{ color: '#954f09' }}></span>
                        </figcaption>
                     </figure>
                  </div>
               </div>
               <div className="card-2">
                  <div className="card-decor" style={{ backgroundColor: '#ffcc00' }}></div>
                  <div className="card-body">
                     <h2 style={{ color: '#ffcc00' }}>Statistik Data Pertahun</h2>
                     <div className="barchart-Wrapper">
                        <div className="barChart-Container">
                           <div className="barchart">
                              <div className="barchart-Col">
                                 <div className="barchart-Bar" style={{ height: '75%', backgroundColor: '#4e79a7' }}></div>
                                 <div className="barchart-BarFooter">
                                    <h3>2019</h3>
                                 </div>
                              </div>
                              <div className="barchart-Col">
                                 <div className="barchart-Bar" style={{ height: '50%', backgroundColor: '#f28e2c' }}></div>
                                 <div className="barchart-BarFooter">
                                    <h3>2020</h3>
                                 </div>
                              </div>
                              <div className="barchart-Col">
                                 <div className="barchart-Bar" style={{ height: '75%', backgroundColor: '#e15759' }}></div>
                                 <div className="barchart-BarFooter">
                                    <h3>2021</h3>
                                 </div>
                              </div>
                              <div className="barchart-Col">
                                 <div className="barchart-Bar" style={{ height: '25%', backgroundColor: '#76b7b2' }}></div>
                                 <div className="barchart-BarFooter">
                                    <h3>2022</h3>
                                 </div>
                              </div>
                              <div className="barchart-Col">
                                 <div className="barchart-Bar" style={{ height: '100%', backgroundColor: '#59a14f' }}></div>
                                 <div className="barchart-BarFooter">
                                    <h3>2023</h3>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>)}

      </div>
   )
}

export default Dashboard