import style from './style/login.module.css'
import { Button, Modal, Input, Form, Space } from 'antd';
import { UserOutlined, KeyOutlined, GithubFilled, GoogleCircleFilled } from '@ant-design/icons';
import { Alert } from '../components/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../service/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CLOSE_LOGIN } from 'module/loginModalReducer';
import { LOG_IN } from 'module/loginReducer';
import { db } from 'service/firebase'
import { collection, getDocs } from "firebase/firestore"; 
import { SET_USER } from '../module/userReducer';

export const Login = () => {
    // hook 변수로 선언
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 모달 관련
    const isLoginModalOpen = useSelector((state) => {
        return state.loginModalReducer;
    });    
    
    const encrypt = async (data) => {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    const setUser = async () => {
        const querySnapshot = await getDocs(collection(db, "user"));
        querySnapshot.forEach(async (doc) => {
            let data = doc.data();
            let dbId = data.id;
            let dbPassword = data.password;
            if (dbId === email && dbPassword === await encrypt(password)) {
                dispatch({
                    type: SET_USER,
                    payload: data
                })
            }
        });
    }

    /** 로그인 모달 닫기 함수 */
    const closeLoginModal = () => {
        dispatch(CLOSE_LOGIN())
    }
    const CHANGE_STATE_LOGIN = () => {
        dispatch(LOG_IN())
    };

    // 라우트 관련
    const gotoSignUp = () => {
        navigate('/signup')
    }
    const gotoHome = () => {
        navigate('/')
    }
    // 로그인 관련
    /** 로그인에 필요한 정보 state로 초기화 */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /** 로그인 상태로 변경 */
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await setUser();
            CHANGE_STATE_LOGIN();
            console.log('로그인 완료!');
        } catch (error) {
            console.log('로그인 실패! : ', error)
        }
    }
    
    return (
            <Modal 
                centered
                open={isLoginModalOpen}
                onCancel={closeLoginModal}
                bodyStyle={{ 
                    height: '40rem',
                    }}
                footer={null}
                keyboard>
                <div
                    className={`${style.login_modal}`}
                >
                    <h4
                    style={{
                        paddingTop: '3rem',
                        fontWeight: '600'
                    }}
                    >DOG에 오신걸 환영합니다
                    <span>
                        <img 
                        style={{
                            width: '1.7rem',
                            height: '1.7rem',
                            padding: '0  0.7rem 0 0.7rem',
                            verticalAlign : '-0.2rem',
                        }} 
                        src='assets/logo.png' alt='logo'/></span>
                    </h4>
                    <Form 
                        onFinish={() => {
                            closeLoginModal();
                            handleLogin();
                            gotoHome();
                            Alert('DOG에 온 걸 환영해요 🎉');
                        }}
                        name='login'
                        className={`${style.form}`}
                        initialValues={{remember: true}}
                        >
                        <Form.Item
                            name="id"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                    message: '아이디를 이메일 형식으로 입력해주세요.',
                                },
                            ]} 
                            >
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='아이디를 입력해주세요.'
                                className={`${style.login_input}`}
                                size="large" 
                                prefix={<UserOutlined style={{
                                    marginRight: '1.5rem'
                                }}/>} 
                                />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: '비밀번호를 입력해주세요.',
                            },
                            ]}
                        >
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                placeholder="비밀번호를 입력해주세요." 
                                className={`${style.login_input}`}
                                size="large" 
                                prefix={<KeyOutlined style={{
                                    marginRight: '1.5rem'
                                }}/>}
                                />
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                htmlType='submit'
                                type="text" shape='round'
                                className={`${style.login_btn_modal}`}
                            >로그인
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <span>계정이 없으신가요?</span>
                        <Button type="link"
                            onClick={() => {
                                closeLoginModal();
                                gotoSignUp();
                            }}
                        >회원가입 하러가기
                        </Button>
                    </div>
                </div>
            </Modal>
            )
}
