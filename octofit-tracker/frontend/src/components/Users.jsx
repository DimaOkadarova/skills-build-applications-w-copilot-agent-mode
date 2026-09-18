import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

//Codespaces endpoint suffix: -8000.app.github.dev/api/users/
export function CollectionPage({ eyebrow, title, intro, error, children }) { return <><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro">{intro}</p></div><div className="page-count">{error ? '!' : 'SYNCED'}<small>{error || 'From OctoFit API'}</small></div></div>{error ? <div className="alert alert-warning">{error}. Check your backend and `VITE_CODESPACE_NAME` setting.</div> : children}</> }

export default function Users() {
  const [users, setUsers] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/users/').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <CollectionPage eyebrow="People" title="Your movement community" intro="Know the people behind every personal best." error={error}><div className="people-grid">{users.map((user, index) => <article className="person-card" key={user._id || user.id || index}><div className="avatar">{user.name?.split(' ').map((part) => part[0]).join('').slice(0, 2) || '?'}</div><h2>{user.name || 'OctoFit member'}</h2><p>{user.email || 'No email provided'}</p><span className="tag">{user.profile?.fitnessLevel || 'Member'}</span><p className="muted">{user.profile?.goals?.join(' · ') || 'Goals not set'}</p></article>)}</div></CollectionPage>
}