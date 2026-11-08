import { NavLink } from 'react-router-dom'

const userTabs = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/saved', label: 'Saved', icon: '♡' },
  { to: '/account', label: 'Account', icon: '◉' },
]

const partnerTabs = [
  { to: '/create-food', label: 'Create Food', icon: '+' },
  { to: '/foodPartner/my-foods', label: 'Your Foods', icon: '▣' },
  { to: '/foodPartner/account', label: 'Account', icon: '◉' },
]

const BottomTabBar = ({ isFoodPartner = false }) => {
  const tabs = isFoodPartner ? partnerTabs : userTabs

  return (
  <nav className="bottom-tabbar" aria-label="Main navigation">
    {tabs.map((tab) => (
      <NavLink
        key={tab.to}
        to={tab.to}
        end={tab.to === '/'}
        className={({ isActive }) => isActive ? 'bottom-tab bottom-tab-active' : 'bottom-tab'}
      >
        <span aria-hidden="true">{tab.icon}</span>
        {tab.label}
      </NavLink>
    ))}
  </nav>
  )
}

export default BottomTabBar
