import style from './style/note.module.css'
import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons'
import { Tree ,Button, notification} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NoteWrite } from './Note/NoteWrite'
import { NoteNull } from './Note/NoteNull';
import { NoteEdit } from './Note/NoteEdit';
import { callGetNoteApi } from 'apis/noteApiCalls';
import { INIT_CURRENT_NOTE, SET_CURRENT_NOTE } from 'module/currentNoteReducer';
import { NOTE_NOT_NULL } from 'module/noteNullReducer';

export const Note = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const note = useSelector(state => state.noteReducer);
  const currentNote = useSelector(state => state.currentNoteReducer);
  const isNoteNull = useSelector(state => state.noteNullReducer)
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);

  useEffect(() => {
      dispatch(callGetNoteApi(user));
      dispatch({type: INIT_CURRENT_NOTE});
    },[]
  );
  
  const onSelect = (selectedKeys, info) => {
    dispatch({
      type: SET_CURRENT_NOTE, 
      payload: [info.node]
    });
    dispatch(
      NOTE_NOT_NULL()
    )
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type,message) => {
    api[type]({
    message: message,
    duration: 1.2,
    style: {
        position: 'absolute',
        top: '6rem',
        right: 0
    }
    });
};
  const addNote = () => {
    setModalOpen(true);
  }
    return (
        <main className="main">
            <div className={`${style.note}`}>
                {contextHolder}
                <div className={`${style.note_tree_wrap}`}>
                  <Tree
                    className={`${style.note_tree}`}
                    switcherIcon={<DownOutlined />}
                    onSelect={onSelect}
                    treeData={note}
                  />
                  <Button
                    type='text'
                    className={`${style.btn_font} ${style.add_new_btn}`}
                    onClick={() => {addNote()}}
                  >새 글 추가
                  </Button>
                </div>
                <div className={`${style.note_check}`}>
                <NoteWrite modalOpen={modalOpen} setModalOpen={setModalOpen} openNotificationWithIcon={openNotificationWithIcon}/>
                { 
                  isNoteNull? 
                  <NoteNull/> :
                  <NoteEdit openNotificationWithIcon={openNotificationWithIcon}/>
                }
                </div>
            </div>
        </main>
    )
}
