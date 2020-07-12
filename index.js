import apolloModule from '@nuxtjs/apollo'

import apolloPlugin from './plugins/apollo'
import appPlugin from './plugins/app'
import authPlugin from './plugins/auth'

function callApolloModule () {
  const proxy = Object.create(this)
  proxy.addPlugin = () => {}

  apolloModule.call(proxy, {
    clientConfigs: {
      default: {
        link: {},
      },
    },
  })
}

export default function ejApp (moduleOptions) {
  callApolloModule.call(this)

  const apolloOptions = this.options.apollo || moduleOptions

  // 注册 plugin，注册越晚，执行越早

  this.addPlugin(authPlugin)
  this.addPlugin(appPlugin)
  this.addPlugin({
    ...apolloPlugin,
    options: apolloOptions,
  })
}

module.exports.meta = require('./package.json')
