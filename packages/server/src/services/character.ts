import axios from 'axios'
import { Configuration } from '../config'
import { Context } from '../context'
import { NexusGenRootTypes } from '../generated/nexus-types'
import { hashString } from '../utils/hash'
import { getUniqueId } from '../utils/id'

const CHARACTERS_PER_PAGE = 30

const marvelApiClient = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
})

const buildMarvelAuthParams = (config: Configuration) => {
  const requestId = getUniqueId()

  return {
    ts: requestId,
    apikey: config.marvelApi.publicKey,
    hash: hashString(
      requestId + config.marvelApi.privateKey + config.marvelApi.publicKey
    ),
  }
}

interface GetCharactersOpts {
  page?: number | null
}

/**
 * Get characters from a specific page, ordered by name
 *
 * @param ctx
 * @param opts
 * @returns the characters response
 */
export const getCharacters = async (
  ctx: Context,
  opts: GetCharactersOpts
): Promise<NexusGenRootTypes['AllCharacters']> => {
  const page = opts.page ?? 1

  if (page === 0) {
    throw new Error('The page arg cannot be 0')
  }

  const offset = (page - 1) * CHARACTERS_PER_PAGE

  const res = await marvelApiClient.get('/characters', {
    params: {
      ...buildMarvelAuthParams(ctx.configuration),
      limit: CHARACTERS_PER_PAGE,
      offset,
      orderBy: 'name',
    },
  })

  const totalResults = res.data.data.total
  const pageCount = Math.ceil(totalResults / CHARACTERS_PER_PAGE)

  if (page > pageCount) {
    throw new Error(`The page arg cannot be greater than ${pageCount}`)
  }

  return {
    pageInfo: {
      totalResults,
      currentPage: page,
      resultsPerPage: CHARACTERS_PER_PAGE,
      pageCount,
    },
    nodes: res.data.data.results.map((c: any) => ({
      name: c.name,
      pictureUrl: `${c.thumbnail.path}.${c.thumbnail.extension}`.replace(
        'http://',
        'https://'
      ),
    })),
  }
}
