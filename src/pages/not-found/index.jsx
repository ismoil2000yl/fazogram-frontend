// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const index = () => {
//   const navigate = useNavigate()
//   return (
//     <div className='not-found'>
//       <div className="not-found-box">
//         <h1>404</h1>
//         <h4>Xatolik</h4>
//         <h6>Bu sahifa topilmadi...!</h6>
//         <button className="back-page" onClick={() => navigate("/")}>
//           Ortga qaytish
//         </button>
//       </div>
//     </div>
//   )
// }

// export default index


import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined, HomeOutlined
} from "@ant-design/icons";

const index = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Bu saxifa topilmadi"
      extra={
        <div className="w-full flex items-center justify-center gap-4">
          <Button type="primary" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
            Orqaga qaytish
          </Button>
          <Button className='bg-green-600 hover:bg-green-600 text-white hover:bg-opacity-80' type='ghost' onClick={() => navigate('/')}>
            <HomeOutlined />
            Bosh sahifa
          </Button>
        </div>
      }
    />
  );
};
export default index;
