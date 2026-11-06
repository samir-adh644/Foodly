import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
]

function UserRegister() {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const fullName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/register",{
      fullName,
      email,
      password
    },{
      withCredentials:true
    })

    console.log(response.data);
    navigate("/");
  };

  return <main className="auth-shell">
    <section className="auth-intro" aria-label="Foodly introduction">
      <Link className="brand" to="/user/login" aria-label="Foodly home"><span className="brand-mark" aria-hidden="true">F</span><span>foodly</span></Link>
      <div className="intro-copy"><span className="eyebrow">A better way to eat</span><h1>Foodly for you</h1><p>Discover meals you will love, from kitchens you can trust.</p></div>
      <div className="intro-shape intro-shape-one" aria-hidden="true" /><div className="intro-shape intro-shape-two" aria-hidden="true" />
    </section>
    <section className="auth-panel"><div className="auth-card">
      <div className="card-heading"><div><span className="eyebrow">Your account</span><h2>Create your account</h2></div><span className="status-dot" aria-label="Secure sign in" /></div>
      <p className="card-subtitle">Start your Foodly journey in a few seconds.</p>
      <form className="auth-form" onSubmit={handleSubmit}>{fields.map((field) => <label key={field.name}>{field.label}<input type={field.type} name={field.name} placeholder={field.placeholder} autoComplete={field.autoComplete} /></label>)}<button type="submit" className="primary-button" >Create account <span aria-hidden="true">→</span></button></form>
      <p className="switch-copy">Already have an account? <Link to="/user/login">Sign in</Link></p>
      <div className="role-switch"><span>Are you a food partner?</span><Link to="/foodPartner/register">Partner register</Link></div>
    </div><p className="legal-copy">By continuing, you agree to Foodly&apos;s Terms and Privacy Policy.</p></section>
  </main>
}

export default UserRegister
