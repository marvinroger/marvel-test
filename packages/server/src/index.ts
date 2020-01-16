import { ApolloServer } from 'apollo-server'
import { makeSchema } from 'nexus'
import * as path from 'path'
import { getConfiguration } from './config'
import { Context } from './context'
import * as allTypes from './schema'
import * as characterService from './services/character'

const schema = makeSchema({
  types: allTypes,
  outputs: {
    schema: path.join(__dirname, '../src/generated/schema.graphql'),
    typegen: path.join(__dirname, '../src/generated/nexus-types.ts'),
  },
  typegenAutoConfig: {
    sources: [
      { source: path.resolve(__dirname, '../src/context.ts'), alias: 'ctx' },
    ],
    contextType: 'ctx.Context',
  },
})

const configuration = getConfiguration()
const context: Context = { configuration, characterService }
const server = new ApolloServer({ schema, context })

async function main() {
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

main().catch(e => console.error(e))
