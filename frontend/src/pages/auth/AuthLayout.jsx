import { Link } from 'react-router-dom'

const roleLabels = {
  user: {
    name: 'Foodly for you',
    description: 'Discover meals you will love, from kitchens you can trust.',
  },
  foodPartner: {
    name: 'Foodly for partners',
    description: 'Bring your menu to hungry customers around you.',
  },
}

function BrandMark() {
  return (
    <Link className="brand" to="/user/login" aria-label="Foodly home">
      <span className="brand-mark" aria-hidden="true">F</span>
      <span>foodly</span>
    </Link>
  )
}

function AuthLayout({ mode, role, fields }) {
  const isRegister = mode === 'register'
  const roleContent = roleLabels[role]
  const basePath = `/${role}`
  const partnerLabel = isRegister ? 'Partner register' : 'Partner sign in'
  const userLabel = isRegister ? 'User register' : 'User sign in'

  return (
    <main className="auth-shell">
      <section className="auth-intro" aria-label="Foodly introduction">
        <BrandMark />
        <div className="intro-copy">
          <span className="eyebrow">{role === 'user' ? 'A better way to eat' : 'Grow with Foodly'}</span>
          <h1>{roleContent.name}</h1>
          <p>{roleContent.description}</p>
        </div>
        <div className="intro-shape intro-shape-one" aria-hidden="true" />
        <div className="intro-shape intro-shape-two" aria-hidden="true" />
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">{role === 'user' ? 'Your account' : 'Partner account'}</span>
              <h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2>
            </div>
            <span className="status-dot" aria-label="Secure sign in" />
          </div>

          <p className="card-subtitle">
            {isRegister ? 'Start your Foodly journey in a few seconds.' : 'Sign in to continue where you left off.'}
          </p>

          <form className="auth-form">
            {fields.map((field) => (
              <label key={field.name}>
                {field.label}
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                />
              </label>
            ))}

            {!isRegister && (
              <div className="form-meta">
                <label className="checkbox-label">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="primary-button">
              {isRegister ? 'Create account' : 'Sign in'}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="switch-copy">
            {isRegister ? 'Already have an account?' : 'New to Foodly?'}{' '}
            <Link to={`${basePath}/${isRegister ? 'login' : 'register'}`}>
              {isRegister ? 'Sign in' : 'Create an account'}
            </Link>
          </p>

          <div className="role-switch">
            <span>{role === 'user' ? 'Are you a food partner?' : 'Ordering for yourself?'}</span>
            <Link to={role === 'user' ? `/foodPartner/${mode}` : `/user/${mode}`}>
              {role === 'user' ? partnerLabel : userLabel}
            </Link>
          </div>
        </div>
        <p className="legal-copy">By continuing, you agree to Foodly&apos;s Terms and Privacy Policy.</p>
      </section>
    </main>
  )
}

export default AuthLayout
