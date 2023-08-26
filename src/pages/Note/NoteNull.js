import style from '../style/note.module.css'
import { Card, Empty } from 'antd'

export const NoteNull = () => {
    return(
        <Card className={`${style.note_null}`}>
            <div>
                <h5
                style={{
                    textAlign: 'center',
                    marginBottom: '3rem'
                    }}
                >글을 선택해주세요</h5>
                <Empty
                    description={false} 
                />
            </div>
        </Card>
    )
}
