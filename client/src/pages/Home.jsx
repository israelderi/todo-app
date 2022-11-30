import Navbar from "../components/Navbar"
import styled from 'styled-components';
import { useContext, useState } from "react";
import Task from "../components/Task";
import { AuthContext } from "../context/UserContext";
import useFetch from '../useFetch'
import axios from "axios";


const HomePage = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction:column;
`;
const HomeCont = styled.div`
  margin-top: 100px;
  overflow: scroll;
  max-width: 450px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap:20px;
  align-items: center;
  width: 600px;
  background-color: #000000bc;
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.20) 0px -12px 30px,
    rgba(0, 0, 0, 0.20) 0px 4px 6px,
    rgba(0, 0, 0, 0.20) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const Title = styled.h1`
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`;
const AddNew = styled.div`
  margin-top: -20px;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const TodoList = styled.div`

`;
const NewTaskInp = styled.input`
  flex:4;
  height: 35px;
  width: 300px;
  padding: 7px 0px;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  padding-right: 10px;
  text-align: right;
  font-size: 18px;
`;
const BtnAddNew = styled.button`
  flex:1;  
  border: none;
  width: 70px;
  height:50px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  :hover{
    background-color: #288fd9;
  } 
`;

const Home = () => {
  
  const { user } = useContext(AuthContext);

  const [newTask, setnewTask] = useState({
    text: '',
  });
   
  const { data, reFetch } = useFetch(
    `http://localhost:3330/api/task/tasks/${user._id}`
  );
  //console.log( 'user' + user)
  //console.log('data', data)

  
  const addNewTask =  async () =>{
    console.log(newTask)
      if(newTask !== ''){
          await axios.post(`http://localhost:3330/api/task/create/${user._id}`,newTask).then( () => {
            reFetch()
            window.location.reload(false);
        })
      }else{

      }
  }

  
  return (
    <HomePage>
      <Navbar />
      <HomeCont>
        <Title>המשימות שלי</Title>
        <AddNew>
           <BtnAddNew onClick={addNewTask}>הוסף</BtnAddNew>
           <NewTaskInp type='text' placeholder="משימה חדשה" id='text' value={newTask.text} onChange= {(event) => {setnewTask({...newTask, text: event.target.value})}} />
        </AddNew>
        <TodoList>
            {data.map((task) => (
                  <Task task={task} key={task._id} />
                ))}
        </TodoList>
      </HomeCont>
    </HomePage>
  )
}

export default Home

      