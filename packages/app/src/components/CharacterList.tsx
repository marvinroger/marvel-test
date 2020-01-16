import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useCallback, useState } from 'react'
import {
  Container,
  Dimmer,
  Grid,
  Loader,
  Message,
  Pagination,
} from 'semantic-ui-react'
import Character from './Character'

/*
  I could have used styled-components or another CSS-in-JS
  But, given the simplicity of the project, this would be
  overkill
*/
const style = {
  pagination: {
    marginTop: '30px',
  },
}

const GET_ALL_CHARACTERS_QUERY = gql`
  query GetAllCharacters($page: Int) {
    allCharacters(page: $page) {
      pageInfo {
        currentPage
        pageCount
        resultsPerPage
        totalResults
      }

      nodes {
        name
        pictureUrl
      }
    }
  }
`

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1)

  const handlePageChange = useCallback(
    (_e, { activePage }) => {
      setPage(activePage)
    },
    [setPage]
  )

  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS_QUERY, {
    variables: { page },
  })

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  if (error) {
    return (
      <Dimmer active>
        <Message color="red">Une erreur est survenue.</Message>
      </Dimmer>
    )
  }

  const { allCharacters } = data
  const { pageInfo, nodes: characters } = allCharacters

  return (
    <>
      <Container>
        <Grid doubling columns={4}>
          {characters.map((c: any) => (
            <Grid.Column key={c.name}>
              <Character pictureUrl={c.pictureUrl} name={c.name} />
            </Grid.Column>
          ))}
        </Grid>
      </Container>
      <Container textAlign="center" style={style.pagination}>
        <Pagination
          onPageChange={handlePageChange}
          activePage={pageInfo.currentPage}
          totalPages={pageInfo.pageCount}
        />
      </Container>
    </>
  )
}

export default CharacterList
