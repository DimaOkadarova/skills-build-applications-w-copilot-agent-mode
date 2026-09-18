import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workout from './components/Workout.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink className="brand" to="/users"><span className="brand-mark">O</span><span>OctoFit <small>TRACKER</small></span></NavLink><span className="status-dot">LIVE DATA</span></header>
      <div className="app-body">
        <aside className="sidebar" aria-label="Primary navigation"><p className="eyebrow">Workspace</p><NavLink to="/users">People <span>01</span></NavLink><NavLink to="/teams">Teams <span>02</span></NavLink><NavLink to="/activities">Activities <span>03</span></NavLink><NavLink to="/leaderboard">Leaderboard <span>04</span></NavLink><NavLink to="/workouts">Workouts <span>05</span></NavLink><div className="sidebar-note"><strong>Move together.</strong><br />Small habits compound into big wins.</div></aside>
        <main className="content"><Routes><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workout />} /><Route path="*" element={<Navigate to="/users" replace />} /></Routes></main>
      </div>
    </div>
  )
}

export default App
