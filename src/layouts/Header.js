import style from './style/header.module.css'
import { Button, Space, Badge} from 'antd';
import { UserOutlined, CalendarOutlined, CalendarFilled, EditFilled, EditOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_LOGIN } from 'module/loginModalReducer';
import { OPEN_ACCOUNT_DRAWER } from 'module/accountDrawerReducer';
import { OPEN_CALENDAR_DRAWER } from 'module/calendarDrawerReducer';
import { useState, useEffect } from 'react';
import { IN_NOTE_PAGE, OUT_NOTE_PAGE } from 'module/noteIconReducer';
import { IN_MY_PAGE, OUT_MY_PAGE } from 'module/accountIconReducer';

export const Header = () => {
    // hook 변수로 선언
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // login state 불러오기
    const IS_LOGIN = useSelector(state => state.loginReducer);
    const noteIconFilled = useSelector((state) => state.noteIconReducer)
    const accountIconFilled = useSelector((state) => state.accountIconReducer)

    useEffect(() => {
        if (!IS_LOGIN && location.pathname === '/note') {
            navigate('/');
        }
        if (!IS_LOGIN && location.pathname === '/mypage') {
            navigate('/');
        }
        if (IS_LOGIN && location.pathname === '/') {
            navigate('/note');
        }
        if (location.pathname === '/note') {
            dispatch(IN_NOTE_PAGE())
        }
        if (location.pathname !== '/note') {
            dispatch(OUT_NOTE_PAGE())
        }
        if (location.pathname === '/mypage') {
            dispatch(IN_MY_PAGE())
        }
        if (location.pathname !== '/mypage') {
            dispatch(OUT_MY_PAGE())
        }
        
    }, [IS_LOGIN, location, navigate]);

    // 라우터 관련
    const gotoNote = () => { navigate('/note') };

    /**  로그인 모달 열기 함수 */
    const openLoginModal = () => {
        dispatch(OPEN_LOGIN());
    }
    /**  계정 서랍 열기 함수 */
    const openAccountDrawer = () => {
        dispatch(OPEN_ACCOUNT_DRAWER());
    }
    /**  계정 서랍 열기 함수 */
    const openCalendarDrawer = () => {
        dispatch(OPEN_CALENDAR_DRAWER());
    }
    
    return (
        <header className={`${style.header}`}>
            <div className={`${style.logo}`} 
                onClick={() => {
                    gotoNote();
                }}>
                <h1 className={`${style.logo_text}`}>DOG</h1>
                <img className={`${style.logo_img}`} src='assets/logo.png' alt='logo'/>
            </div>
            <div className={`${style.buttons}`}>
                {IS_LOGIN ?
                <Space>
                    <Button type="text" shape="circle" 
                        size="large" icon={
                            noteIconFilled ? <EditFilled /> : <EditOutlined/> } 
                        onClick={() => {
                            gotoNote();
                        }}
                    />
                        
                    <Button type="text" shape="circle"  
                        onClick={() => {
                            openCalendarDrawer();
                        }}
                        size="large" icon={
                            <CalendarOutlined />
                        }
                    />
                    <Button type="text" shape="circle" 
                        onClick={()=> {
                            openAccountDrawer();
                        }}
                        size="large" icon={
                            accountIconFilled? 
                                <UserOutlined 
                                style={{
                                    background : '#1677ff',
                                    borderRadius: '50%',
                                    padding: '3px',
                                    color: 'white'
                                    }}/> : 
                                <UserOutlined />
                            
                        }
                    />
                </Space> :
                <Space wrap>
                    <Button type="text" shape='round'
                        className={`${style.login_btn_header}`}  
                        onClick={openLoginModal}
                    >로그인
                    </Button>
                </Space> }
            </div>
        </header>
    )
}   