import { Form, Input, Button, Radio, Checkbox, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

const EditableQuestion = (props) => {

  const addChoice = () => {
	  let index = 0;
	  if(props.choices.length > 0){
		  index = parseInt(props.choicesKey.slice(-1)[0]) + 1;
	  }
    const newChoicesKey = props.choicesKey.concat([index]);
    const newChoices = props.choices.concat(['']);
    props.setChoicesKey(newChoicesKey);
    props.setChoices(newChoices);
    props.setQuestionAttribute(props.question.key, {'choices': newChoices});
  }

  const removeChoice = (index) => {
    const newChoices = props.choices.slice();
    const newChoicesKey = props.choicesKey.slice();
    newChoices.splice(index, 1);
    newChoicesKey.splice(index, 1);
    props.setChoicesKey(newChoicesKey);
    props.setChoices(newChoices);
    props.setQuestionAttribute(props.question.key, {'choices': newChoices});
  }

  const modifyChoice = (value, index) => {
    const newChoices = props.choices.slice();
    newChoices[index] = value;
    props.setChoices(newChoices);
    props.setQuestionAttribute(props.question.key, {'choices': newChoices});
  }

  const setAnswer = (e) => {
    props.setQuestionAttribute(props.question.key, {'answer': props.choices[e.target.value]});
  }

  const setTitle = (e) => {
    props.setQuestionAttribute(props.question.key, {'title': e.target.value});
  }

  return (
    <>
      <Form.Item
        name={props.question.key}
        label={<h3>{props.question.key}Q{props.question.order}</h3>} 
        rules={[
          {
            required: true,
            message: 'Please input the question',
          },
        ]}
      >
        <Input.TextArea name={props.question.key} autoSize={true} placeholder="Please input your question" onChange={setTitle} bordered={false}/>
      </Form.Item>
      <Form.Item
	      name={props.question.key + "answer"}
        rules={[
          {
            required: true,
            message: 'Please select at least one answer',
          },
        ]}
      >
        {(()=>{switch(props.question.question_type) {
          case 3: 
            return (
              <Input placeholder="Please input your answer" />
            );
          case 2:
            return (
              <Checkbox.Group onChange={setAnswer}>
                {props.choices.map((choice, index)=>(
                  <Row key={props.choicesKey[index]}>
                    <Checkbox value={index}>
                      <Input placeholder="choice" defaultValue={choice} size='small' onChange={(e)=>modifyChoice(e.target.value, index)} bordered={false}/>
                      <MinusCircleOutlined onClick={() => removeChoice(index)} />
                    </Checkbox>
                  </Row>
                ))}
              </Checkbox.Group>
            );
          default:
            return (
              <Radio.Group onChange={setAnswer} defaultValue={props.choices.indexOf(props.question.answer)}>
                {props.choices.map((choice, index)=>{
                  return(
                    <Row key={props.choicesKey[index]}>
                      <Radio value={index}>
                        <Input placeholder="choice" defaultValue={choice} size='small' onChange={(e)=>modifyChoice(e.target.value, index)} bordered={false}/>
                        <MinusCircleOutlined onClick={() => removeChoice(index)} />
                      </Radio>
                    </Row>
                  )
                })}
              </Radio.Group>
            );
        }})()}
      </Form.Item>
      <div style={{textAlign: 'center'}}>
        <Button type="secondary" onClick={()=> addChoice()}>
        <PlusOutlined /> Add choice
        </Button>
      </div>
    </>
  )
}

export default EditableQuestion;