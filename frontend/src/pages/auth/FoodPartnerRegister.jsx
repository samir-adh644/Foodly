import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fields = [
  { name: 'businessName', label: 'Business name', type: 'text', placeholder: 'Your business name', autoComplete: 'organization' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000', autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
  { name: 'address', label: 'Address', type: 'text', placeholder: 'Business address', autoComplete: 'street-address' },
]

function FoodPartnerRegister() {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.businessName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/foodPartner/register",{
      name,
      email,
      phone,
      address,
      password
    },{
      withCredentials:true
    })

    console.log(response.data);
    navigate("/create-food");
  };


  return <main className="auth-shell">
    <section className="auth-intro" aria-label="Foodly introduction"><Link className="brand" to="/user/login" aria-label="Foodly home"><span className="brand-mark" aria-hidden="true">F</span><span>foodly</span></Link><div className="intro-copy"><span className="eyebrow">Grow with Foodly</span><h1>Foodly for partners</h1><p>Bring your menu to hungry customers around you.</p></div><div className="intro-shape intro-shape-one" aria-hidden="true" /><div className="intro-shape intro-shape-two" aria-hidden="true" /></section>
    <section className="auth-panel"><div className="auth-card"><div className="card-heading"><div><span className="eyebrow">Partner account</span><h2>Create your account</h2></div><span className="status-dot" aria-label="Secure sign in" /></div><p className="card-subtitle">Start your Foodly journey in a few seconds.</p>
      <form className="auth-form" onSubmit={handleSubmit}>{fields.map((field) => <label key={field.name}>{field.label}<input type={field.type} name={field.name} placeholder={field.placeholder} autoComplete={field.autoComplete} /></label>)}<button type="submit" className="primary-button">Create account <span aria-hidden="true">→</span></button></form>
      <p className="switch-copy">Already have an account? <Link to="/foodPartner/login">Sign in</Link></p><div className="role-switch"><span>Ordering for yourself?</span><Link to="/user/register">User register</Link></div>
    </div><p className="legal-copy">By continuing, you agree to Foodly&apos;s Terms and Privacy Policy.</p></section>
  </main>
}

export default FoodPartnerRegister
