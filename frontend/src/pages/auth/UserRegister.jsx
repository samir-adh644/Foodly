import AuthLayout from './AuthLayout'

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
]

function UserRegister() {
  return <AuthLayout mode="register" role="user" fields={fields} />
}

export default UserRegister
