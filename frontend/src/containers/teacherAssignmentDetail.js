import { Form, Button, Divider, Space, Modal } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import Question from '../components/QuestionForm';
import { useDispatch } from 'react-redux';
import * as actions from "../store/actions/assignments";
import { Link } from "react-router-dom";
import EditableDescriptions from './TeacherAssignmentDescriptions';
import getDifference from '../util';

const TeacherAssignmentDetail = (props) => {
  const [questionList, setQuestionList] = useState([]);
  const [questionOrder, setQuestionOrder] = useState([]);
  const [list, setList] = useState({});
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  //initialize questionList and questionOrder
	useEffect(() => {
		if(props.assignment.questions !== undefined && props.assignment.questions.length > 0)
		{
      if(props.assignment.questions[0].key === undefined)
      {
        const newQuestionList = props.assignment.questions.map((item, index) => {
          const updatedItem = {
            key: index,
            ...item
          };
          return updatedItem;
        });
        setQuestionList(newQuestionList);
        setQuestionOrder([...Array(newQuestionList.length).keys()]);
      }
		}
    else {
      setQuestionList([]);
    }
	}, [props.assignment.questions]);

  //set form initial values
	useEffect(() => {
		if(questionList !== undefined)
		{
			const temp = {};
			questionList.forEach(item=>{
			  temp[item.key] = item.title;
			  temp[item.key + "answer"] = item.choices.indexOf(item.answer);
			});
			setList(temp);
		}
	}, [questionList]);

  // update question order
  useEffect(() => {
    if(questionOrder.length > 0){
      const newQuestionList = questionList.map((item) => {
        const updatedItem = {
          ...item,
          order: questionOrder.indexOf(item.key) + 1
        };
        return updatedItem;
      });
      setQuestionList(newQuestionList);
    }
  }, [questionOrder]);

  const setQuestionAttribute = (key, attribute) => {
    const newQuestionList = questionList.map((item) => {
      if (item.key === key) {
        const updatedItem = {
          ...item,
          ...attribute
        };
        return updatedItem;
      }
      return item;
    });
    setQuestionList(newQuestionList);
  };

  const addQuestion = () => {
    let questionKey = 0
    if(questionList.length > 0){
      questionKey = questionList[questionList.length - 1].key + 1;
    }
    const newQuestionOrder = questionOrder.concat([questionKey]);
    const newQuestion = {key: questionKey, order: questionList.length + 1, title: '', choices: [], answer: null, question_type: 1};
    const newQuestionList = questionList.concat(newQuestion);
    setQuestionList(newQuestionList);
    setQuestionOrder(newQuestionOrder);
  };

  const removeQuestion = (key) => {
    const newQuestionList = questionList.filter((item) => item.key !== key);
    const newQuestionOrder = questionOrder.filter((item) => item !== key);
    setQuestionList(newQuestionList);
    setQuestionOrder(newQuestionOrder);
  };

  const copyQuestion = (key) => {
    const item = questionList.filter((item) => item.key === key);
    const questionKey = questionList[questionList.length - 1].key + 1;
    const newQuestionOrder = questionOrder.concat([questionKey]);
    const newItem = {
      ...item[0],
      order: questionList.length + 1,
      key: questionKey
    };
    const newQuestionList = questionList.concat(newItem);
    setQuestionList(newQuestionList);
    setQuestionOrder(newQuestionOrder);
  }

  const reorderQuestion = result => {
    const {destination, source } = result;
    if(!destination) {
      return;
    }
    if (destination.index === source.index)
    {
      return;
    }
    const newQuestionList = questionList.slice();
    const [reorderedItem] = newQuestionList.splice(result.source.index, 1);
    newQuestionList.splice(result.destination.index, 0, reorderedItem);
    setQuestionList(newQuestionList);

    const newQuestionOrder = questionOrder.slice();
    const [reorderedKey] = newQuestionOrder.splice(result.source.index, 1);
    newQuestionOrder.splice(result.destination.index, 0, reorderedKey);
    setQuestionOrder(newQuestionOrder);
  }

  const onFinish = () => {
    const sortedQuestionList = questionList.slice().sort(function(a, b) {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    });
    const differences = getDifference(props.assignment.questions, sortedQuestionList);
    const newChanges = differences.map((item) => {
      const { key, ...temp } = item

      const current = questionList.filter((item) => item.key === key)[0];
      let updatedItem = {...item};
      if('choices' in temp){
        updatedItem = {
          ...updatedItem,
          choices: current['choices']
        }
      }
      if('id' in current){
        updatedItem = {
          id: current['id'],
          ...updatedItem
        };
      }
      return updatedItem;
    });
    dispatch(actions.updateAssignment(props.assignment.code, {questions: newChanges}));
  };

  function submit() {
    form.validateFields()
      .then(() => {
        form.submit();
        Modal.success({
          content: 'Success',
        });
      })
	  .catch(error => console.log(error))
  }

  return (
  <>
    <Divider orientation="middle">
      <Space>
        <Link to="/assignment"><ArrowLeftOutlined /></Link>{props.assignment.code}
      </Space>
    </Divider>
    <EditableDescriptions assignment={props.assignment} />
    {
      Object.keys(list).length !== 0 ?
      <Form name="dynamic_form_item" onFinish={onFinish} initialValues={list} form={form}>
        <DragDropContext onDragEnd={reorderQuestion}>
          <Droppable droppableId="droppable-1">
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}  
              >
                {
                  questionList.map((question) => {
                    return (
                      <Question 
                        key={question.key}
                        index={questionOrder.indexOf(question.key)}
                        question={question} 
                        removeQuestion={removeQuestion}
                        copyQuestion={copyQuestion}
                        setQuestionAttribute={setQuestionAttribute}
                      />
                    )
                  })
                }
                {provided.placeholder}
              </div>
            )
          }
          </Droppable>
        </DragDropContext>
      </Form>
      :
      null
    }
    <div style={{textAlign: 'center', marginTop: "15px"}}>
      <Button type="secondary" onClick={addQuestion} style={{marginRight: "15px"}}>
        <PlusOutlined /> Add question
      </Button>
      <Button type="primary" onClick={submit}>
        Save changes
      </Button>
    </div>
	</>
  );
};

export default TeacherAssignmentDetail;
