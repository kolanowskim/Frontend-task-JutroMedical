import { useQuery, gql } from "@apollo/client";
import styled from 'styled-components';
import Select, { SingleValue, } from 'react-select'
import { useState } from "react";
import CountryComponent from './CountryComponent';

const GET_Countries = gql`
      query getCountries {
        countries {
        name
        code
        continent {
          name
        }
      }
    }
    `;

interface SelectOption {
    label: string;
    value: string;
}

const options: SelectOption[] = [
    { value:"Europe", label: 'Europe' },
    { value:"Asia", label: 'Asia' },
    { value:"Africa", label: 'Africa' },
    { value:"Antarctica", label: 'Antarctica' },
    { value:"Oceania", label: 'Oceania' },
    { value:"South America", label: 'South America' },
    { value:"North America", label: 'North America' },
    { value:"", label: 'Clear' },


];

const MainPage = () => {
    const [selectedContinent, setSelectedContinet] = useState<SingleValue<SelectOption>>({
        label: "",
        value: ""
      });
    const [searchCountry, setSearchCountry] = useState("");
    const { loading, error, data } = useQuery(GET_Countries);

    const handleContinentChange = (selectedContinent: SingleValue<SelectOption>) => {
        setSelectedContinet(selectedContinent);
      
      };


    if (loading) return <>'Loading...'</>;
    if (error) return <>`Error! ${error.message}`</>;

  return (
    <Wrapper>
        <SearchWrapper>
            <Input value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} placeholder={"Provide country name"}/>
            <Select options={options} value={selectedContinent} onChange={handleContinentChange} className="react-select"/>
        </SearchWrapper>

        <CountriesWrapper>
            {data.countries.filter((item: any) => {
                const continet = item.continent.name
                
                if(selectedContinent?.value === ""){
                    return item
                }
                else if(selectedContinent?.value !== "" && continet === selectedContinent?.value){
                    return item
                }
            }).filter((item: any) => {
                
                if(searchCountry === ""){
                    return item
                }else if(item.name.toLowerCase().includes(searchCountry.toLowerCase())){
                    return item
                }
            }).map((item: {name: String, code: String}) => (
                <CountryComponent name={item.name} code={item.code}/>
                ))}
        </CountriesWrapper>

    </Wrapper>
  )
}

export default MainPage

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const SearchWrapper = styled.div`
    display: flex;
    margin: 40px;
    width: 600px;
    justify-content: space-around;
`;

const Input = styled.input`
    width: 200px;   
`;

const CountriesWrapper = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
`;
