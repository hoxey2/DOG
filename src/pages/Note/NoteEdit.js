import style from '../style/note.module.css'
import { Form , Card, Input, Button, notification } from "antd"
import { useState ,useRef, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { db } from 'service/firebase'
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { callGetNoteApi } from 'apis/noteApiCalls';
import { useNavigate } from 'react-router-dom'
import { Alert } from 'components/Alert'
import { NOTE_NULL } from 'module/noteNullReducer'
import { DeleteOutlined, StepBackwardOutlined } from '@ant-design/icons'

export const NoteEdit = ({openNotificationWithIcon}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const currentNote = useSelector(state => state.currentNoteReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer);
    const titleFocus = useRef(null);
    const contentFocus = useRef(null);

    const gotoNote = () => {
        navigate('/note')
    }
    const onCont = (color) => {
    contentFocus.current.resizableTextArea.textArea.style.background = color;
    }
    const adjustContentHeight = () => {
        let textarea = contentFocus.current.resizableTextArea.textArea;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    const onTitle = (color) => {
        titleFocus.current.resizableTextArea.textArea.style.background = color;
    }
    const adjustTitleHeight = () => {
        let textarea = titleFocus.current.resizableTextArea.textArea;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const updateNote = async () => {
        await setDoc(doc(db, "notes", currentNote[0].key), {
            title: title,
            content: content,
            writer: currentNote[0].writer,
            createDate: currentNote[0].createDate,
            updateDate: new Date().toLocaleString(),
            deleteYN: currentNote[0].deleteYN
        });
        dispatch(callGetNoteApi(user));
    }

    const deleteNote = async () => {
        await deleteDoc(doc(db, "notes", currentNote[0].key));
        dispatch(callGetNoteApi(user));
        dispatch(
            NOTE_NULL()
          )
    }
    useEffect(() => {
        setTitle(currentNote[0].title);
        setContent(currentNote[0].content);
    },[currentNote])
    return( 
        <>
            <Card
                bordered={false}
                className={`${style.note_write}`}
                style={{
                    boxShadow: 'none',
                }}
                bodyStyle={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '2rem',
                    width: '100%',
                    height: 'inherit'
                }}
            >   
                <Form
                    style={{
                        height: 'inherit',
                        position: 'relative'
                    }}
                >
                    <Input.TextArea
                        ref={titleFocus}
                        id="title"
                        rows={1} 
                        onFocus={() => {
                            onTitle('#eee')}}
                        onBlur={() => {
                            onTitle(null)}}
                        onInput={() => {
                            adjustTitleHeight();
                        }}
                        onChange={onChangeTitle}
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
                        value={title}
                    />
                    <Input.TextArea
                        id="content"
                        rows={1}
                        ref={contentFocus}
                        onFocus={() => {
                            onCont('#eee');
                        }}
                        onBlur={() => {
                            onCont(null);
                        }}
                        onInput={() => {
                            adjustContentHeight();
                        }}
                        onChange={onChangeContent}
                        className={`${style.note_content}`}
                        style={{
                            minHeight: '52rem',
                            resize: 'none'
                        }}
                        bordered={false}
                        value={content}
                    />
                    <Button
                        type='text'
                        className={`${style.add_new_btn}`}
                        onClick={() => {
                            deleteNote();
                            setTitle('');
                            setContent('');
                            openNotificationWithIcon('warning', '글이 삭제됬어요');
                            }}
                        style={{
                            width: '48%',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            background: 'red'
                            }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                    {isHovered ?
                        <DeleteOutlined 
                            style={{
                                fontSize:'2rem'
                            }}
                        />
                        :
                        '삭제하기'
                    }
                    </Button>
                    <Button
                        type='text'
                        className={`${style.add_new_btn}`}
                        onClick={() => {
                            updateNote();
                            openNotificationWithIcon('success', '글이 수정됬어요');
                            }}
                        style={{
                            width: '48%',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            }}
                    >
                    저장하기
                    </Button>
                </Form>
            </Card>     
        </>
                                  
    )
}