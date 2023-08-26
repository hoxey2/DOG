import { Drawer } from 'antd';
import { Alert } from 'components/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_ACCOUNT_DRAWER } from 'module/accountDrawerReducer';
import { SET_USER } from 'module/userReducer';
import { LOG_OUT } from 'module/loginReducer';
import { useNavigate } from 'react-router-dom';

export const Account = () => {
  // hook 변수에 선언
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer);

  // 상태 가져오기
  const isDrawerOpen = useSelector((state) => {
    return state.accountReducer;
  })

  const closeDrawer = () => {
    dispatch(CLOSE_ACCOUNT_DRAWER())
  }

  const logout = () => {
    dispatch(LOG_OUT());
    dispatch({ type: SET_USER, payload: {}});
  }

  return (
    <>
      <Drawer 
        width='30rem'
        title={`${user.nickname} 님 반가워요`}
        placement="right" 
        onClose={closeDrawer} 
        open={isDrawerOpen}
        style={{
          textAlign: 'end',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.3rem'
          }}>
          <p
            onClick={() => {
              navigate('/mypage');
              closeDrawer();
              }}
            style={{
              cursor: 'pointer',
              padding: '3rem 0'
            }}
          >마이 페이지</p>
          <p
            onClick={() => {
              logout();
              closeDrawer();
              Alert('로그아웃 됬어요');
            }}
            style={{
              cursor: 'pointer',
              padding: '3rem 0'
            }}
          >로그아웃</p>
        </div>
      </Drawer>
    </>
  );
};