import { Input, Radio, Checkbox, Row, Form } from 'antd';
import React from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export const StudentReadOnlyQuestion = (props) => {
  return (
    <>
      <h3>Q{props.question.order}. {props.question.title}</h3>
      <Form.Item name={props.question.id}>
      {(()=>{switch(props.question.type) {
        case 3: 
          return (
            <Input name={props.question.id} placeholder="Please input your answer" />
          );
        case 2:
          return (
            <Checkbox.Group>
              {props.question.choices.map((choice, index)=>(
                <Row key={index}>
                  <Checkbox value={choice}>
                    {choice}
                  </Checkbox>
                </Row>
              ))}
            </Checkbox.Group>
          );
        default:
          return (
            <Radio.Group>
              {props.question.choices.map((choice, index)=>{
                return(
                  <Row key={index}>
                    <Radio value={choice}>
                      {choice}
                      {
                        props.mark !== -1 && props.answer.real_answer === choice ?
                        <CheckOutlined style={{color: "green", marginLeft: "10px"}}/>
                        :
                        null
                      }
                      {
                        props.mark !== -1 && props.answer.answer === choice && props.answer.answer !== props.answer.real_answer ?
                        <CloseOutlined style={{color: "red", marginLeft: "10px"}}/>
                        :
                        null
                      }
                    </Radio>
                  </Row>
                )
              })}
            </Radio.Group>
          );
      }})()}
      </Form.Item>
    </>
  )           
}

export const TeacherReadOnlyQuestion = (props) => {
	const setAnswer = (e) => {
    props.setQuestionAttribute(props.question.key, {'answer': props.choices[e.target.value]});
  }
  return (
    <>
      <h3>Q{props.question.order}. {props.question.title}</h3>
      <Form.Item name={props.question.key + "answer"}>
      {(()=>{switch(props.question.question_type) {
        case 3: 
          return (
            <Input placeholder="Please input your answer" />
          );
        case 2:
          return (
            <Checkbox.Group onChange={setAnswer}>
              {props.question.choices.map((choice, index)=>(
                <Row key={props.choicesKey[index]}>
                  <Checkbox value={index}>
                    {choice}
                  </Checkbox>
                </Row>
              ))}
            </Checkbox.Group>
          );
        default:
          return (
            <Radio.Group onChange={setAnswer} defaultValue={props.choices.indexOf(props.question.answer)}>
              {props.question.choices.map((choice, index)=>{
                return(
                  <Row key={props.choicesKey[index]}>
                    <Radio value={index}>
                      {choice}
                    </Radio>
                  </Row>
                )
              })}
            </Radio.Group>
          );
      }})()}
	    </Form.Item>
    </>
  )           
}