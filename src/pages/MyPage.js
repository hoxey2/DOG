import { Button, Form, Input, Space } from "antd";
import { useSelector } from "react-redux";

const MyPage = () => {
    const user = useSelector(state => state.userReducer)
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
                                <Input/>
                                <Button
                                    onClick={console.log(user)}
                                >획인</Button>
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
export default MyPage;