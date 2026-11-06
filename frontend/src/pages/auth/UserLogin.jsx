import { Link } from 'react-router-dom'

const fields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', autoComplete: 'current-password' },
]

function UserLogin() {
  return <main className="auth-shell">
    <section className="auth-intro" aria-label="Foodly introduction"><Link className="brand" to="/user/login" aria-label="Foodly home"><span className="brand-mark" aria-hidden="true">F</span><span>foodly</span></Link><div className="intro-copy"><span className="eyebrow">A better way to eat</span><h1>Foodly for you</h1><p>Discover meals you will love, from kitchens you can trust.</p></div><div className="intro-shape intro-shape-one" aria-hidden="true" /><div className="intro-shape intro-shape-two" aria-hidden="true" /></section>
    <section className="auth-panel"><div className="auth-card">
      <div className="card-heading"><div><span className="eyebrow">Your account</span><h2>Welcome back</h2></div><span className="status-dot" aria-label="Secure sign in" /></div><p className="card-subtitle">Sign in to continue where you left off.</p>
      <form className="auth-form">{fields.map((field) => <label key={field.name}>{field.label}<input type={field.type} name={field.name} placeholder={field.placeholder} autoComplete={field.autoComplete} /></label>)}<div className="form-meta"><label className="checkbox-label"><input type="checkbox" name="remember" /><span>Remember me</span></label><a href="#forgot-password">Forgot password?</a></div><button type="submit" className="primary-button">Sign in <span aria-hidden="true">→</span></button></form>
      <p className="switch-copy">New to Foodly? <Link to="/user/register">Create an account</Link></p><div className="role-switch"><span>Are you a food partner?</span><Link to="/foodPartner/login">Partner sign in</Link></div>
    </div><p className="legal-copy">By continuing, you agree to Foodly&apos;s Terms and Privacy Policy.</p></section>
  </main>
}

export default UserLogin
