import AuthLayout from './AuthLayout'

const fields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'current-password' },
]

function FoodPartnerLogin() {
  return <AuthLayout mode="login" role="foodPartner" fields={fields} />
}

export default FoodPartnerLogin
