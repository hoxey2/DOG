import style from './style/welcome.module.css'
import { Button, Space } from 'antd';
import { useSelector ,useDispatch } from 'react-redux';
import { OPEN_LOGIN } from 'module/loginModalReducer';

export const Welcome = () => {
    // hook 변수로 선언
    const dispatch = useDispatch();

    // 로그인 상태 가져오기
    const IS_LOGIN = useSelector((state) => {
        return state.loginReducer;
    })

    // 로그인 모달 열기 함수
    const openLoginModal = () => {
        dispatch(OPEN_LOGIN());
    }
  
    return (
        <main className='main'>
            <div className={`${style.welcome}`}>
                <h1>나의 개발 일지</h1>
                <h1 className={`${style.font_logo}`}>D.O.G</h1>
                {IS_LOGIN ? 
                '' : 
                <Button type='text' shape='round'
                    className={`${style.start_btn}`}
                    onClick={openLoginModal}
                >지금 시작하기
                </Button>}
                
            </div>
        </main>
    )
}