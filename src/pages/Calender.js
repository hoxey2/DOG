import React, { useState, useEffect } from 'react';
import { Calendar, Drawer, Card, Button, theme } from 'antd';
import { CLOSE_CALENDAR_DRAWER } from 'module/calendarDrawerReducer';
import { useSelector, useDispatch } from 'react-redux';

export const Calender = () => {

  const dispatch = useDispatch();

  const closeCalendar = () => {
    dispatch(CLOSE_CALENDAR_DRAWER());
  }
  
  const isCalendarOpen = useSelector((state) => {
      return state.calendarReducer
  });
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    margin: '0 1rem',
    border: '1px solid #eee',
    borderRadius: token.borderRadiusLG,
    flex: 1,
  };
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      const formattedTime = new Date().toLocaleTimeString();
      setCurrentTime(formattedTime);
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);
  return (
    <>
      <Drawer 
        style={{position: 'relative'}}
        placement="top" 
        onClose={closeCalendar}
        open={isCalendarOpen}
        height='45rem'
      >
        <h4
          style={{
            position: 'absolute', 
            top: '2.5rem', 
            left: '50%', 
            transform: 'translate(-50%, -50%)'}}
        >
          일정 보기
        </h4>
        <h5
          style={{
            color: 'grey',
            position: 'absolute', 
            top: '1.5rem', 
            right: '1.5rem'}}
        >{currentTime}</h5>
        <div style={{ 
          display: 'flex',
          }}
        >
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
          <div style={wrapperStyle}>
            <Card 
              title="일정" 
              bordered={false} 
              style={{ 
                width: '100%', 
                height: '100%', 
                position: 'relative',
                border: 'none',
                boxShadow: 'none'
                }}
              >
              <Button
                style={{
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem',
                  }}
              >추가
              </Button>
              <ol>
                <li>할 일 1</li>
                <li>할 일 2</li>
                <li>할 일 3</li>
              </ol>
            </Card>
          </div>
        </div>
      </Drawer>
    </>
  )
}