## Marvel characters browser

This is a Marvel characters browser, developed for the Smartrenting test.

### Stack

* A GraphQL server, created with apollo-server
    * Proxify the Marvel API, to hide the credentials
* Code-first GraphQL typed schema generator with [Nexus](https://nexus.js.org/)
* The App is using React Hooks, Apollo Client, and Semantic UI

### Getting started

1. Copy the `packages/server/.env.example` file, and name it `packages/server/.env`. Put the Marvel API keys in it.

2. Run

```bash
docker-compose up
```

3. The GraphQL server will be listening at `http://localhost:4000`, and the app at `http://localhost:3000`.

Note: if you want to change the host ports, don't forget to update the `REACT_APP_SERVER_URL` env variable in the `docker-compose.yml`.

### Possible improvements

Given the simplicity of the project, I consider this would have been overkill, but:

* Implement unit tests
* Auto-generate the GraphQL client, based on the server schema file, so that we can have TS types in the app context
* Track state in a state container (Redux, Mobx, easy-peasy, etc.)
* Use styled-components (or another CSS-in-JS lib) instead of hard-coded styles
