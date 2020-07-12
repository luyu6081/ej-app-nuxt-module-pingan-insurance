import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {createApolloClient} from 'vue-cli-plugin-apollo/graphql-client'

Vue.use(VueApollo)

export default function (ctx, inject) {
  const {app, env} = ctx

  const apolloClients = {clients: {}}

  <% Object.keys(options.clientConfigs).forEach(key => { %>
  {
    let clientConfig

    <% if (typeof options.clientConfigs[key] === 'object') { %>
      clientConfig = <%= JSON.stringify(options.clientConfigs[key], null, 2) %>
    <% } else if (typeof options.clientConfigs[key] === 'string') { %>
      clientConfig = require('<%= options.clientConfigs[key] %>')
      if ('default' in clientConfig) {
        clientConfig = clientConfig.default
      }
      clientConfig = clientConfig(ctx)
    <% } %>

    const {apolloClient} = createApolloClient({
      httpEndpoint: '/graphql',
      httpLinkOptions: {
        credentials: 'include',
      },
      ...clientConfig,
    })

    <% if (key === 'default') { %>
      apolloClients.defaultClient = apolloClient
    <% } else { %>
      apolloClients.clients['<%= key %>'] = apolloClient
    <% } %>
  }
  <% }) %>

  const {apolloClient: authClient} = createApolloClient({
    httpEndpoint: env.NUXT_ENV_AUTH_HTTP_ENDPOINT,
    httpLinkOptions: {
      credentials: 'include',
    },
  })
  apolloClients.clients.auth = authClient

  // Make VueApollo work as normal
  app.apolloProvider = new VueApollo({
    ...apolloClients,
  })

  inject('apollo', {
    ...apolloClients.defaultClient,
    auth: authClient,
  })
}
