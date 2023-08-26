import { db } from 'service/firebase';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"; 
import { SET_NOTE } from 'module/noteReducer';
import { useSelector } from 'react-redux';

export function callGetNoteApi(user) {
    return async function getNoteApi(dispatch, getState) {
        console.log(user);
        const notes = collection(db, "notes");
        const result = await getDocs(query(
            notes,
            orderBy("createDate", "desc"),
        ));
        let arr = [];
        result.forEach((doc) => {
            if (user.id === doc.data().writer) {
                arr.push({
                    key: doc.id,
                    title: doc.data().title,
                    content: doc.data().content,
                    writer: doc.data().writer,
                    createDate: doc.data().createDate,
                    updateDate: doc.data().updateDate,
                    deleteYN: doc.data().deleteYN
                });
            }
        });

        await dispatch({
            type: SET_NOTE,
            payload: arr
        });
    }
}