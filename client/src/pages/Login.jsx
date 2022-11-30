import styled from 'styled-components';
import Navbar from "../components/Navbar";
import imgLogin from '../imges/imgLogin.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from "../context/UserContext";

const LoginPage = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction:column;
`;
const LoginCont = styled.div`
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
const LoImg = styled.img`
  width:450px;
  height:500px;
`;
const InputLogin = styled.input`
  height: 35px;
  width: 300px;
  padding: 7px 0px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  margin-bottom: 20px;
  text-align: right;
`;
const BtnLogin = styled.button`
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
const LinkToSignup = styled.p`
  font-weight: 100;
  font-size: 12px;
  color: #114be0;
  cursor: pointer;
  :hover{
    color: #288fd9;
  } 
`;

const Login = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("http://localhost:3330/api/user/login", user);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/home")
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE",});
        console.log(err)
    }
  };
  
  return (
    <LoginPage>
      <Navbar />
      <LoginCont>
        <FromCont>
          <InputLogin required placeholder='שם משתמש' onChange={(e)=> setUserName(e.target.value)} />
          <InputLogin required type='password' placeholder='סיסמה' onChange={(e)=> setPassword(e.target.value)} />
          <BtnLogin onClick={handleSubmit}>שלח</BtnLogin>
          <LinkToSignup onClick={() => navigate('/register')}>אין לך חשבון ? לחץ כאן כדי להירשם</LinkToSignup>
        </FromCont>
        <LoImg src={imgLogin} />
      </LoginCont>
    </LoginPage>
  )
}

export default Login
