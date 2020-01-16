## Requests

```graphql
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
```
