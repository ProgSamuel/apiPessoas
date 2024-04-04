import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.css'
import Card from './component/Card'

const GridContainer = styled.div`
 width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  justify-content: center;
  align-content: center;

  @media (max-width: 840px) {
    grid-template-columns: 1fr 1fr;
  
}

@media (max-width: 430px) {
    grid-template-columns: 1fr;
  
}
`;

function App() {
  const apiBase = "https://6495dc81b08e17c91792c92d.mockapi.io/api/v1/people"

  const [pessoas, setPessoas] = useState<any[]>([])
  const [busca, setBusca] = useState<string>('')
  const [resultado, setResultado] = useState<any[]>([])

  useEffect(() => {
    axios.get(apiBase)
      .then((response) => {
        setPessoas(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const filterPessoas = pessoas.filter((pessoa: any) =>
      pessoa.name.toLowerCase().includes(busca.toLowerCase())
    )
    setResultado(filterPessoas)
  }, [busca, pessoas])

  return (
    <>
      <div>
        <p>Buscar Pessoa</p>
        <input type='text' onChange={(event) => setBusca(event.target.value)} />
      </div>
      <GridContainer>
        {resultado.length === 0 ? (
          <p>Nenhum resultado encontrado</p>
        ) : (
          resultado.map((pessoa: any, index) => (
            <Card key={index} nome={pessoa.name} avatar={pessoa.avatar} telefone={pessoa.phone} ultimoNome={pessoa.last_name} phone={''}/>
          ))
        )}
        {pessoas.map((pessoa: any, index) => (
          <Card key={index} nome={pessoa.name} avatar={pessoa.avatar} telefone={pessoa.phone} ultimoNome={pessoa.last_name} phone={''} />
        ))}
      </GridContainer>
    </>
  )
}

export default App
