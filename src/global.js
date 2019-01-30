import Vue from 'vue'

export const userKey = '__session_user'

// export const baseApiURL = 'http://localhost:8080'
export const baseApiURL = 'https://questions-and-answers-esig.herokuapp.com'

export function showError(e) {
     if (e && e.response && e.response.data)
          Vue.toasted.global.defaultError({ msg: e.response.data.errors })
     else if (typeof e === 'string')
          Vue.toasted.global.defaultError({ msg: e.response.data.errors })
     else
          Vue.toasted.global.defaultError()

}

export default { baseApiURL, showError, userKey}