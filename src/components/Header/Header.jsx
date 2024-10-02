import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${colors.primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    margin: 0 20px 0;
    font-weight: bold;
  }
  a:hover {
    color: ${colors.infoColor};
  }
  p {
    position: absolute;
    margin-left: 80%;
    color: ${colors.primaryWhiteColor};
    font-size: 14px;
    font-weight: bolder;
  }
`;

function Header() {
  return (
    <Nav>
      <Link to="/">Dashboard</Link>
      <Link to="/players">Jogadores</Link>
      <Link to="/battles">Batalhas</Link>
      <Link to="/queries">Consultas</Link>
    </Nav>
  );
}

export default Header;
