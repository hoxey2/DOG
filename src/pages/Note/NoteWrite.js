import style from '../style/note.module.css'
import { Modal, Card, Form ,Input, Button, notification } from "antd"
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { db } from 'service/firebase'
import { collection, addDoc } from "firebase/firestore";
import { callGetNoteApi } from 'apis/noteApiCalls';
import { Alert } from 'components/Alert'

export const NoteWrite = ({modalOpen, setModalOpen, openNotificationWithIcon}) => {

    const [form] = Form.useForm();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const user = useSelector(state => state.userReducer);
    const note = useSelector(state => state.noteReducer);

    const contentFocus = useRef(null);
    const onCont = (color) => {
        
    contentFocus.current.resizableTextArea.textArea.style.background = color;
    }

    const titleFocus = useRef(null);
    const dispatch = useDispatch();
    
    const onTitle = (color) => {
        titleFocus.current.resizableTextArea.textArea.style.background = color;
    }

    const addNote = async () => {
        try {
            const newNote = {
                title: title,
                content: content,
                deleteYN: 'N',
                writer: user.id,
                createDate: new Date().toLocaleString(),
                updateDate: '',
            };
            const docRef = await addDoc(collection(db, "notes"), newNote);

            dispatch(callGetNoteApi(user));

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
            openNotificationWithIcon('success', '글이 추가됬어요');
    }


    return(
        <>
            <Modal
                open={modalOpen}
                onCancel={()=> {setModalOpen(false); form.resetFields();}}
                footer={null}
                bodyStyle={{
                    height: '50rem',
                }}
                centered
            >
                <Card
                    bordered={false}
                    className={`${style.note_write}`}
                    style={{
                        boxShadow: 'none',
                        border: 'none',
                    }}
                    bodyStyle={{
                        background: 'transparent',
                        padding: 0,
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        height: 'inherit'
                    }}
                >
                    <Form
                        form={form}
                        onFinish={() => {
                            addNote();
                            setModalOpen(false);
                            form.resetFields();
                        }}
                        name='note'
                        style={{
                            height: 'inherit',
                            position: 'relative'
                        }}
                    >
                        <Form.Item
                            noStyle
                            name='title'
                            rules={[
                                        {
                                            required: true,
                                            message: '제목란이 비어있습니다.',
                                        },
                                    ]} 
                        >
                            <Input.TextArea
                                ref={titleFocus}
                                id="title"
                                rows={1} 
                                placeholder="제목을 입력해주세요"
                                onChange={(e) => {setTitle(e.target.value);}}
                                onFocus={() => {
                                    onTitle('#eee')}}
                                onBlur={() => {
                                    onTitle(null)}}
                                onInput={() => {
                                }}
                                className={`${style.note_title}`}
                                style={{
                                    resize: 'none',
                                    height: '5.2rem',
                                    maxHeight: '5.2rem',
                                    textOverflow: 'ellipsis',
                                    overflowY: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                                bordered={false}
                            />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            name='content'
                            rules={[
                                        {
                                            required: true,
                                            message: '내용란이 비어있습니다.',
                                        },
                                    ]} 
                        >
                            <Input.TextArea
                                ref={contentFocus}
                                id="content"
                                rows={1}
                                placeholder='내용을 입력해주세요'
                                
                                onChange={(e) => {setContent(e.target.value);}}
                                onFocus={() => {
                                    onCont('#eee');
                                }}
                                onBlur={() => {
                                    onCont(null);
                                }}
                                onInput={() => {
                                }}
                                className={`${style.note_content}`}
                                style={{
                                    height: '35rem',
                                    maxHeight: '35rem',
                                    resize: 'none'
                                }}
                                bordered={false}
                            />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            className={`${style.save_btn_wrap}`}
                        >
                            <Button
                                htmlType='submit'
                                type='text'
                                className={`${style.btn_font} ${style.add_new_btn}`}
                                style={{
                                    zIndex: '10000'
                                }}
                            >저장하기
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>
        
    )
}