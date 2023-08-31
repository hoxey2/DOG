import { Button, Form, Input, Space } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";

const Modify = () => {
    const user = useSelector(state => state.userReducer)
    const [nickname, setNickname] = useState(user.nickname)
    return(
        <>
            <div className="main">
                <div style={{
                    height: 'auto',
                    minHeight: 'inherit',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Form
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <Form.Item
                            label="닉네임"
                        >   
                            <Space>
                                <Input
                                    placeholder={user.nickname}
                                />
                                <Button
                                >확인</Button>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            label="비밀번호"
                        >
                            <Input.Password
                            />
                        </Form.Item>
                        <Form>
                            <Button
                                // htmlType='submit'
                                type='text' shape='round'
                                style={{
                                    backgroundColor: 'lightgrey',
                                    color: 'black'
                                }}
                            >
                                변경완료
                            </Button>
                        </Form>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Modify;