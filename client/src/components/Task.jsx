import styled from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';
import { AuthContext } from '../context/UserContext';
import { useContext, useState } from 'react';


const TaskCont = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  padding-left:15px;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  border-color: white;
  background-color: #a8a8a8;
  margin:10px;
  border-radius: 0.5rem;
  border: ${props => props.done ? '2px solid green' : 'none'};
  opacity: ${props => props.done ? '0.6' : ''};
  overflow: scroll;
`;

const Details = styled.p`
  font-weight:100;
  color: white;
  flex:6;
  text-align: right;
  padding-right: 10px;
  color: ${props => props.done ? 'green' : 'white'};
  font-size: 20px;
`;
const Action = styled.div`
  display: flex;
  flex:1;
  gap: 5px;
`;
const IconStyle = styled.p`
  cursor: pointer;
  color: red;
  font-size: 23px;
  color: ${(props) => props.type === "done" && 'green'}; 
`;
 
const Task = (task) => {

  const { user } = useContext(AuthContext);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3330/api/task/delete/${task.task._id}/${user._id}`).then( () => {
        window.location.reload(false);
    })
  }

  const [done, setDone] = useState(false) 

  return (
    <TaskCont done = {done}>
      <Action>
      <IconStyle type='delete' onClick={()=> deleteTask(task.task._id)}><AiOutlineDelete /></IconStyle>
      <IconStyle type='done' onClick={()=> setDone(!done)}><TiTick /></IconStyle>
      </Action>
      <Details done = {done}>{task.task.text}</Details>
    </TaskCont>
  )
}

export default Task
