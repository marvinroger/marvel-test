import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000'

export default new ApolloClient({
  link: new HttpLink({ uri: SERVER_URL }),
  cache: new InMemoryCache(),
})
