import { config as dotenvConfig } from 'dotenv'

const env = process.env.NODE_ENV || 'development'

export interface Configuration {
  marvelApi: {
    publicKey: string
    privateKey: string
  }
}

/**
 * Get the configuration from the environment.
 *
 * Note: this could be factorized if there are more variabled needed
 *
 * @returns the configuration
 */
export const getConfiguration = (): Configuration => {
  if (env === 'development') {
    const result = dotenvConfig()

    if (result.error) {
      throw new Error('Could not load .env file')
    }
  }

  const marvelPublicKey = process.env.MARVEL_API_PUBLIC_KEY
  const marvelPrivateKey = process.env.MARVEL_API_PRIVATE_KEY

  if (
    typeof marvelPrivateKey !== 'string' ||
    typeof marvelPublicKey !== 'string'
  ) {
    throw new Error(
      'MARVEL_API_PUBLIC_KEY and/or MARVEL_API_PRIVATE_KEY env not set'
    )
  }

  return {
    marvelApi: {
      publicKey: marvelPublicKey,
      privateKey: marvelPrivateKey,
    },
  }
}
