import { objectType } from 'nexus'

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.int('totalResults')
    t.int('resultsPerPage')
    t.int('currentPage')
    t.int('pageCount')
  },
})
