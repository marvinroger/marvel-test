import { extendType, intArg, objectType } from 'nexus'
import { PageInfo } from './common'

export const Character = objectType({
  name: 'Character',
  definition(t) {
    t.string('name')
    t.string('pictureUrl')
  },
})

export const AllCharacters = objectType({
  name: 'AllCharacters',
  definition(t) {
    t.field('pageInfo', { type: PageInfo })
    t.list.field('nodes', { type: Character })
  },
})

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.field('allCharacters', {
      type: AllCharacters,
      args: {
        page: intArg(),
      },
      async resolve(_root, args, ctx) {
        return ctx.characterService.getCharacters(ctx, { page: args.page })
      },
    })
  },
})
