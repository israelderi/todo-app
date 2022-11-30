import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/UserContext';
import logo from '../imges/logo.png'
import { useNavigate } from "react-router-dom";

const Nav = styled.div`
    width: 100%;
    height:70px;
    background-color: black;
    display: flex;
    justify-content: center;
    padding: 10px 0px;
`;

const NavCont = styled.div`
    width: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
`;

const NavItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
    width: 180px;
    height: 60px;
`;
const User = styled.p`
    color: white;
    font-size: 18px;
    margin-right: 10px;
`;
const Logout = styled.button`
    color: white;
    background-color: #112c99;
    padding: 10px 20px;
    border-radius: 1rem;
    border:none;
    font-size:15px;
`;

const Navbar = () => {

  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const LogoutFn = () => {
    dispatch({ type: "LOGOUT"});
    navigate('/')
  }
  return (
    <Nav>
        <NavCont>
            <NavItems>
              <Logo src={logo} />
            </NavItems>
           { user ?  
           <NavItems>
              <User>{user.username}</User>
              <Logout onClick={LogoutFn}>התנתק</Logout>
            </NavItems>
            :('')}
        </NavCont>
    </Nav>
  )
}

export default Navbar
