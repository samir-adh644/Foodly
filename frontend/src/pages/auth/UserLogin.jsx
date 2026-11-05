import AuthLayout from './AuthLayout'

const fields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'current-password' },
]

function UserLogin() {
  return <AuthLayout mode="login" role="user" fields={fields} />
}

export default UserLogin
