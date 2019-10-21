import React , {useState, useEffect} from 'react';
import axios from 'axios'

const Language = ({language}) => {
  return(
    <li>{language.name}</li>
  )
}

const CountryFull = ({country}) => {
  const lang = () => country.languages.map(lan => 
    <Language 
      key={lan.name}
      language={lan}
    />
    )

  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>{lang()}</ul>
      <a href={country.flag}><img src={country.flag} width="200"
       height="150" title={'the flag of '.concat(country.name)} alt="Flag"/></a>
    </div>
  )
}


const Country = (props) => {
  
  return(
    <p>
      {props.country.name}
      <button  onClick={()=> props.setNewFilter(props.country.name)}>
      show 
      </button>
    </p>
  )
  
}

const App = () => {
  const [data, setData] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
  }, [])
  
  
  const filteredArray = data.filter((value) => {
    return value.name.toLowerCase().includes(filter.toLowerCase())

  }
  )
  console.log(filteredArray.length)
  console.log(filteredArray[0])

  const rows = () => filteredArray.map(country => 
     <div key={country.name}>
    
    <Country 
    
    setNewFilter={setNewFilter}
    country={country}/>
    
    
    
      
    </div>
  )
  const countries = () => {
    if(filteredArray.length>10){
      return (
        <p>Too many matches, specify another filter</p>
      );
    }else if(filteredArray.length===1){
      return(
        <CountryFull 
        key={filteredArray[0].name}
        country={filteredArray[0]}
        />
      )
    }
    
    else{
      return(
        rows()
      );
    }
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
}

  return (
    <div>
      
      <form>

      <div>
          find countries <input value={filter}
          onChange={handleFilterChange}
          /> 
        </div>
      </form>
      <div>
        {countries()}
      </div>
    </div>
  );
}

export default App;
