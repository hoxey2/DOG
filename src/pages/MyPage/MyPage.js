import { Button, Form, Input, Space, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MyPage = () => {
    const user = useSelector(state => state.userReducer)
    const [editName, setEditName] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [name, setName] = useState(user.nickname);
    const [password, setPassword] = useState();
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
                        onFinish={
                            () => {

                            }
                        }
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <Form.Item
                            name="id"
                            label="아이디"
                        >   
                            <Space>
                                <Input
                                    value={user.id}
                                    disabled
                                />
                            </Space>
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
                            <Space>
                                <Input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        console.log(name)
                                    }}
                                    disabled={!editName}
                                    maxLength="11"
                                />
                                <Tooltip 
                                    placement="rightTop" 
                                    title={'닉네임을 수정할 수 있습니다.'}>
                                    <Button
                                        onClick={() => setEditName(true)}
                                        disabled={editName}
                                    >수정</Button>
                                </Tooltip>
                            </Space>
                        </Form.Item>
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
                            <Space>
                                <Input.Password
                                    name="password"
                                    value={password}
                                    maxLength='21'
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        console.log(password);
                                        }}
                                    disabled={!editPassword}
                                />
                                <Tooltip 
                                    placement="rightTop" 
                                    title={'비밀번호를 수정할 수 있습니다.'}>
                                <Button
                                    onClick={() => {
                                        setEditPassword(true)
                                    }}
                                    disabled={editPassword}
                                >수정</Button>
                                </Tooltip>
                            </Space>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                            변경하기
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default MyPage;