import Middleware from '../middleware'

Middleware.auth = async function ({app, env, redirect}) {
  const {$app} = app

  // 如果没有当前用户信息，尝试获取它
  if (!$app.state.me) {
    try {
      await $app.fetchMe()
    } catch (err) {
      console.error(err)
    }
  }
  // 如果尝试请求后依然没有当前用户信息，当作未登录处理（401 错误）
  if (!$app.state.me) {
    const {location, encodeURIComponent} = window
    redirect(env.NUXT_ENV_LOGIN_URL, {redirect_url: encodeURIComponent(location.href)})
  }
}
