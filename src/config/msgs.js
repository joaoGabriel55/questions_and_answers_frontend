import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
     iconPack: 'fontawesome',
     duration: 3000
})

Vue.toasted.register(
     'defaultSuccess',
     payload => !payload.msg ? 'Operation Success!' : payload.msg,
     { type: 'success', icon: 'check' }
)

Vue.toasted.register(
     'defaultError',
     payload => !payload.msg ? 'Ops... Error.' : payload.msg,
     { type: 'error', icon: 'times' }
)

Vue.toasted.register(
     'passwordNotMatch',
     'Passwords not match',
     { type: 'error', icon: 'times' }
)
