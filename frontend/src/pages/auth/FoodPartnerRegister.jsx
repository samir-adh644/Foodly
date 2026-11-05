import AuthLayout from './AuthLayout'

const fields = [
  { name: 'businessName', label: 'Business name', type: 'text', placeholder: 'Your business name', autoComplete: 'organization' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000', autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
  { name: 'address', label: 'Address', type: 'text', placeholder: 'Business address', autoComplete: 'street-address' },
]

function FoodPartnerRegister() {
  return <AuthLayout mode="register" role="foodPartner" fields={fields} />
}

export default FoodPartnerRegister
