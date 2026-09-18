import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Users.jsx'

//Codespaces endpoint suffix: -8000.app.github.dev/api/leaderboard/
export default function Leaderboard() {
	const [items, setItems] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetchCollection('/api/leaderboard/').then(setItems).catch((reason) => setError(reason.message))
	}, [])

	const rankedItems = [...items].sort((first, second) => (first.rank ?? 0) - (second.rank ?? 0))

	return <CollectionPage eyebrow="Leaderboard" title="Earn your place" intro="Consistency is the only competition that matters." error={error}>
		<div className="leaderboard-list">{rankedItems.map((item, index) => <article className="rank-row" key={item._id || item.id || index}><span className="rank">{String(item.rank ?? index + 1).padStart(2, '0')}</span><div><strong>{item.user?.name || item.user || 'OctoFit member'}</strong><small>{item.period || 'Current season'}</small></div><b>{Number(item.points ?? 0).toLocaleString()} <small>PTS</small></b></article>)}</div>
	</CollectionPage>
}