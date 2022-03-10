import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import styled from 'styled-components';

const CountryPage = () => {
    const paramas = useParams();
    const GET_Country = gql`
    query getCountry {
        country(code: "${paramas.code}"){
            name
            code
            emoji
            languages {
                name
              }
        }
    }`;

    const { loading, error, data } = useQuery(GET_Country);

    if (loading) return <>'Loading...'</>;
    if (error) return <>`Error! ${error.message}`</>;

  return (
    <Wrapper>
        <CountryDescription>
            <h1>Country: {data.country.name}</h1>
            <H2>Code: {data.country.code}</H2>
            <H2>Emoji: {data.country.emoji}</H2>
            <Hr></Hr>
            <H2>Languages</H2>
            <Ul>
            {data.country.languages.map((item: {name: string}) => (
                <li><Language>{item.name}</Language></li>
            ))}
            </Ul>
        </CountryDescription>
       {data.country.languages.name}
    </Wrapper>
  )
}

export default CountryPage

const Wrapper = styled.div`
display:  flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const CountryDescription = styled.div`
display:  flex;
flex-direction: column ;
align-items: center ;
border: 1px solid lightgray ;
padding: 30px;
box-shadow: 0 0 5px 1px gray;
`
const H2 = styled.h2`
`;

const Hr = styled.hr`
width: 500px;
`;

const Language = styled.p`
`;
const Ul = styled.ul`
margin-top: 0;
padding: 0;
`;


