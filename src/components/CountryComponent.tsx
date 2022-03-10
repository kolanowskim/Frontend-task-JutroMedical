import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const CountryComponent: React.FC<{name: String, code: String}> = ({name, code}) => {

    let navigate = useNavigate();
    const routeChange = () => {
    navigate(`${code}`)
  }

  return (
    <Wrapper onClick={routeChange}>
        <p>Country: {name}</p>
        <p>Code: {code}</p>
    </Wrapper>
  )
}

export default CountryComponent

const Wrapper = styled.div`
border: 1px solid lightgray;
width: 200px;
text-align: center;
margin: 15px;
box-shadow: 0 0 5px 1px gray;
cursor: pointer;
`