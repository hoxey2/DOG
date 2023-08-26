import React from 'react';
import style from './style/qna.module.css';
import { Card, Space } from 'antd';
import { QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Logo from 'components/Logo';

const questionsAndAnswers = [
  {
    id: 1,
    text: 'DOG는 무슨 사이트 인가요?',
    answer: 'DOG는 개발자를 위한 블로그 형식의 사이트입니다.',
  },
  {
    id: 2,
    text: 'DOG에서 무엇을 할 수 있나요?',
    answer: 'DOG에서는 자유로운 글작성을 사생활 침해 받지 않고 작성할 수 있습니다!',
  },
];

const QnA = () => {
  return (
    <div className='main'>
        <div className={`${style.QnA}`}
            style={{boxSizing: 'border-box'}}>
            <Space>
                <h1>QnA</h1>
                <Logo/>
            </Space>
            <div className={`${style.qna_container}`}>
                {questionsAndAnswers.map((qna) => (
                <Card
                    style={{
                        
                    }}
                    headStyle={{
                        borderBottom: 'none'
                    }}
                    bordered={false}
                    key={qna.id}
                    className={`${style.qna_card}`}
                    title={<QuestionCircleOutlined style={{ marginRight: 8 }} />}
                >
                    <p className={`${style.question_text}`}>{qna.text}</p>
                    <p className={`${style.answer_text}`}>
                    <CheckCircleOutlined style={{ marginRight: 8 }} />
                    {qna.answer}
                    </p>
                </Card>
                ))}
            </div>
        </div>
    </div>
  );
}

export default QnA;
