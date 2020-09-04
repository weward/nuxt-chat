import { hash } from '~/assets/utils'
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (localStorage.getItem(hash('access_token')) === null) {
    return redirect('/login')
  }
}
