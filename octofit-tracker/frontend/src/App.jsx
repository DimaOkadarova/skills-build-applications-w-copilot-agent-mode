import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['People', '/users', '01'],
  ['Teams', '/teams', '02'],
  ['Activities', '/activities', '03'],
  ['Leaderboard', '/leaderboard', '04'],
  ['Workouts', '/workouts', '05'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink className="brand" to={navigation[0][1]}><span className="brand-mark">O</span><span>OctoFit <small>TRACKER</small></span></NavLink><span className="status-dot">LIVE DATA</span></header>
      <div className="app-body">
        <aside className="sidebar" aria-label="Primary navigation"><p className="eyebrow">Workspace</p>{navigation.map(([label, path, number]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : undefined}>{label} <span>{number}</span></NavLink>)}<div className="sidebar-note"><strong>Move together.</strong><br />Small habits compound into big wins.</div></aside>
        <main className="content"><Routes><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/users" replace />} /></Routes></main>
      </div>
    </div>
  )
}

export default App
