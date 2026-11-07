import BottomTabBar from '../../components/BottomTabBar'

const Account = () => {
  return (
    <main className="simple-page">
      <section className="account-card">
        <div className="account-avatar" aria-hidden="true">U</div>
        <span className="profile-kicker">Your profile</span>
        <h1>My Account</h1>
        <p>Welcome back to Foodly.</p>
      </section>
      <BottomTabBar />
    </main>
  )
}

export default Account
