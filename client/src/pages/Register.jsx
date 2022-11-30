import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import imgReg from '../imges/imgReg.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const RegisterPage = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction:column;
`;
const RegCont = styled.div`
  margin-top: 100px;
  display: flex;
  gap:30px;
  align-items: center;
  width: 600px;
`;
const FromCont = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction:column;
  gap:15px;
  align-items: center;
  width: 400px;
  margin-bottom:120px;
`;
const RegImg = styled.img`
  width:450px;
  height:450px;
`;
const InputReg = styled.input`
  height: 35px;
  width: 300px;
  padding: 7px 0px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  margin-bottom: 20px;
`;
const BtnReg = styled.button`
  border: none;
  padding: 10px 10px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 30%;
  :hover{
    background-color: #288fd9;
  } 
`;
 const Title = styled.h1`
  color: #23068c;
 `;

const Register = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
    username: username,
    password: password
    };

    try {
      await axios.post("http://localhost:3330/api/user/register", newUser);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <RegisterPage>
      <Navbar />
      <RegCont>
        <FromCont>
          <Title>הירשם עכשיו </Title>
          <InputReg required type='text' placeholder='שם משתמש' onChange={(e)=> setUserName(e.target.value)} />
          <InputReg required type='password' placeholder='סיסמה' onChange={(e)=> setPassword(e.target.value)}/>
          <BtnReg onClick={handleSubmit}>שלח</BtnReg>
        </FromCont>
        <RegImg src={imgReg}/>
      </RegCont>
    </RegisterPage>
  )
}

export default Register
