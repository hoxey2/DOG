import { Header } from './Header';
import { Footer } from './Footer';
import { Login } from '../pages/Login';
import { Note } from "../pages/Note";
import { Welcome } from '../pages/Welcome';
import { SignUp } from "../pages/SignUp";
import { Account }from '../pages/Account';
import { Calender }from '../pages/Calender';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CommentOutlined, QuestionCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import QnA from 'pages/QnA';
import Product from 'pages/Product';
import MyPage from 'pages/MyPage';

export const Layout = () => {
    const isAccountDrawerOpen = useSelector((state) => {
        return state.accountReducer;
    });
    const isCalendarDrawerOpen = useSelector((state) => {
        return state.calendarReducer;
    });
    const isLoginModalOpen = useSelector((state) => {
        return state.loginModalReducer
    });

    return(
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route index element={<Welcome />}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/note' element={<Note/>}/>
                    <Route path='/qna' element={<QnA/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/mypage' element={<MyPage/>} />
                </Routes>
                {isLoginModalOpen ? <Login/> : null }
                {isCalendarDrawerOpen? <Calender/> : null}
                {isAccountDrawerOpen? <Account/> : null}
                <Footer/>
                <FloatButton.Group
                    trigger="click"
                    type="primary"
                    style={{
                        right: '3rem',
                        marginBottom: '2.5rem',
                    }}
                    icon={<QuestionCircleOutlined
                        style={{
                            position: 'relative',
                            fontSize: '2.5rem',
                            right: '0.3rem'
                        }}
                    />}
                    >
                    <Link to='/product'>
                        <FloatButton tooltip='사용법 안내' icon={<SolutionOutlined />}/>
                    </Link>
                    <Link to='/qna'>
                        <FloatButton 
                            style={{marginTop: '1.5rem'}}
                        tooltip='Q&A' icon={<CommentOutlined />} />
                    </Link>
                </FloatButton.Group>
            </BrowserRouter>
        </div>
    )
}
