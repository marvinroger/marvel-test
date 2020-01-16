import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import { Header } from 'semantic-ui-react'
import apolloClient from './apollo-client'
import './App.css'
import CharacterList from './components/CharacterList'

const App: React.FC = React.memo(() => {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <Header as="h1" textAlign="center" content="Marvel Characters" />

        <CharacterList />
      </div>
    </ApolloProvider>
  )
})

export default App
