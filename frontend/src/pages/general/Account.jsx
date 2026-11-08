import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/BottomTabBar'

const Account = ({ isFoodPartner = false }) => {
  const navigate = useNavigate()
  const [account, setAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [accountError, setAccountError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  useEffect(() => {
    const accountType = isFoodPartner ? 'foodPartner' : 'user'

    axios.get(`http://localhost:3000/api/auth/${accountType}/account`, {
      withCredentials: true,
    })
      .then((response) => {
        setAccount(isFoodPartner ? response.data.foodPartner : response.data.user)
      })
      .catch((error) => {
        console.error('Error fetching account data:', error)
        setAccountError('Unable to load your account details.')
      })
      .finally(() => setIsLoading(false))
  }, [isFoodPartner])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setLogoutError('')

    try {
      const accountType = isFoodPartner ? 'foodPartner' : 'user'
      await axios.post(`http://localhost:3000/api/auth/${accountType}/logout`, {}, {
        withCredentials: true,
      })
      navigate(isFoodPartner ? '/foodPartner/login' : '/user/login', { replace: true })
    } catch (error) {
      console.error('Error logging out:', error)
      setLogoutError('Unable to log out. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <main className="simple-page">
      <section className="account-card">
        <div className="account-avatar" aria-hidden="true">
          {account?.name?.charAt(0).toUpperCase() || (isFoodPartner ? 'F' : 'U')}
        </div>
        <span className="profile-kicker">{isFoodPartner ? 'Partner profile' : 'Your profile'}</span>
        <h1>{isFoodPartner ? 'Partner Account' : 'My Account'}</h1>
        {isLoading && <p className="profile-state">Loading account details...</p>}
        {accountError && <p className="logout-error" role="alert">{accountError}</p>}
        {!isLoading && !accountError && account && (
          <dl className="account-details">
            <div>
              <dt>Name</dt>
              <dd>{isFoodPartner ? account.name : account.fullName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{account.email}</dd>
            </div>
            {isFoodPartner && (
              <>
                <div>
                  <dt>Phone</dt>
                  <dd>{account.phone}</dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>{account.address}</dd>
                </div>
              </>
            )}
          </dl>
        )}
        <button className="logout-button" type="button" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </button>
        {logoutError && <p className="logout-error" role="alert">{logoutError}</p>}
      </section>
      <BottomTabBar isFoodPartner={isFoodPartner} />
    </main>
  )
}

export default Account
