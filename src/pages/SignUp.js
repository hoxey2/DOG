import style from './style/signup.module.css'
import { Form, Input, Button, Space, Slider } from 'antd';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../service/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Alert } from '../components/Alert';
import { db } from 'service/firebase'
import { collection, addDoc } from "firebase/firestore";
  
export const SignUp = () => {
    const navigate = useNavigate();
    /** router 홈으로 */
    const gotoHome = () => {
        navigate('/')
    }
    /** 회원가입 state */
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, id, password);
            console.log('회원가입 완료!')
        } catch (error) {
             console.log('회원가입 실패! : ' , error);
        }
    }

    const addUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "user"), {
              id: id,
              password: await encrypt(password),
              nickname: nickname,
              createDate: new Date().toLocaleString(),
              updateDate: '',
              deleteYN: 'N'
            });

            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const encrypt = async (data) => {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    return (
        <main className='main'>
            <Form 
                name='signup'
                className={`${style.signup}`}
                initialValues={{remember: true}}
                onFinish={() => {
                    handleSignUp();
                    addUser();
                    Alert('회원가입 완료 🎉');
                    gotoHome();
                }}
            >
                {/* 아이디 입력창 */}
                <Form.Item  
                    name="id"
                    label="아이디"
                    rules={[
                        {
                            required: true,
                            message: '아이디를 입력해주세요.',
                        },
                        {
                            type: 'email',
                            message: '이메일 형식으로 입력해주세요.'
                        }
                        ]}    
                >
                        <Input
                            value={id}
                            onChange={(e) => {
                                setId(e.target.value);
                            }}
                            placeholder='이메일 입력.'
                            style={{
                                width: '25rem'
                            }}
                        />
                </Form.Item>  

                {/* 비밀번호 입력창 */}
                <Form.Item
                    name="password"
                    label="비밀번호"
                    rules={[
                    {
                        required: true,
                        message: '비밀번호를 입력해주세요.',
                    },
                    {
                        min: 6,
                        message: '6자리 이상으로 작성해주세요.'
                    },
                    {
                        max: 20,
                        message: '20자리 미만으로 작성해주세요.'
                    }
                    ]}
                >
                        <Input.Password
                        value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            placeholder='비밀번호 입력.'
                            style={{
                                width: '25rem'
                            }}
                        />
                </Form.Item>  

                <Form.Item
                    name="nickname"
                    label="닉네임"
                    rules={[
                    {
                        required: true,
                        message: '닉네임을 입력해주세요.',
                    },
                    {
                        max: 10,
                        message: '10자리 미만으로 작성해주세요.'
                    }
                    ]}
                >
                        <Input
                        value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value)
                            }}
                            placeholder='닉네임 입력.'
                            style={{
                                width: '25rem'
                            }}
                        />
                </Form.Item>  

                {/* submit 버튼 */}
                <Form.Item className={`${style.signup_btn_wrap}`}>
                    <Button
                        htmlType='submit'
                        type='text' shape='round'
                        className={`${style.signup_btn}`}
                        >
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </main>
    )
}
