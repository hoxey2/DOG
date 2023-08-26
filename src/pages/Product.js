import React from 'react';
import { Watermark } from 'antd';
const Product = () => (
  <Watermark
    image="/assets/logo.png"
  >
    <div
      className='main'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        letterSpacing: '0.5rem'
      }}
    >
        <h1 style={{
            paddingLeft: '7rem',
            color: '#111',
            textShadow: '3px 3px 3px #eee',
            zIndex: 1000
        }}>서비스 준비중...</h1>
    </div>
  </Watermark>
);
export default Product;