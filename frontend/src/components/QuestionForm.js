import { Card, Radio, Popover } from 'antd';
import { EditOutlined, CloseOutlined, CopyOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { TeacherReadOnlyQuestion } from './ReadOnlyQuestion';
import EditableQuestion from './EditableQuestion';

const Question = (props) => {
  const [editMode, toggleEditMode] = useState(props.question.title === '');
  const [choicesKey, setChoicesKey] = useState([...Array(props.question.choices.length).keys()]);
  const [choices, setChoices] = useState(props.question.choices);
  
  const EditQuestion = () => {
	  if(props.question.title !== '' && props.question.answer !== null){
		  toggleEditMode(!editMode);
	  }
  }
  
  const content = (
    <div>
      <Radio.Group defaultValue={props.question.question_type} onChange={(e)=>props.setQuestionAttribute(props.question.key, {'question_type': e.target.value})}>
        <Radio value={3}>text</Radio>
        <Radio value={1}>radio</Radio>
        <Radio value={2}>checkbox</Radio>
      </Radio.Group>
    </div>
  );

  return (
    <Draggable draggableId={props.question.key.toString()} index={props.index} key={props.question.key}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card 
		        style={{borderColor: editMode ? "red" : "blue", borderWidth: '2px', marginTop: '3px'}}
            key={props.question.key}
            actions={[
              <CopyOutlined key="copy" onClick={()=>props.copyQuestion(props.question.key)} />,
              <EditOutlined key="edit" onClick={EditQuestion}/>,
              <Popover placement="bottomLeft" content={content} trigger="click">
                <EllipsisOutlined key="changeType" />
              </Popover>,
              <CloseOutlined key="close" onClick={() => props.removeQuestion(props.question.key)}/>,
            ]}
          >
            {
              editMode ? 
              <EditableQuestion 
                question={props.question} 
                setQuestionAttribute={props.setQuestionAttribute}
                setChoicesKey={setChoicesKey}
                choicesKey={choicesKey}
                choices={choices}
                setChoices={setChoices}
              />
              :
              <TeacherReadOnlyQuestion 
                question={props.question}
                choicesKey={choicesKey}
                setQuestionAttribute={props.setQuestionAttribute}
                choices={choices}
              />
            }
          </Card>
        </div>
      )}
    </Draggable>
  )
}
export default Question;