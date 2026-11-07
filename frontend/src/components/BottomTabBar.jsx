import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/saved', label: 'Saved', icon: '♡' },
  { to: '/account', label: 'Account', icon: '◉' },
]

const BottomTabBar = () => (
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

export default BottomTabBar
