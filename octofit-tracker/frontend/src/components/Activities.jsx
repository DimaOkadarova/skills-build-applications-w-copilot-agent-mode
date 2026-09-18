import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Users.jsx'

export default function Activities() {
	const [items, setItems] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetchCollection('/api/activities/').then(setItems).catch((reason) => setError(reason.message))
	}, [])

	return <CollectionPage eyebrow="Activity log" title="Momentum, measured" intro="Recent sessions across your OctoFit community." error={error}>
		<div className="table-wrap"><table><thead><tr><th>Session</th><th>Athlete</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{items.map((item) => <tr key={item._id || item.id}><td><strong>{item.type || item.name || 'Workout'}</strong></td><td>{item.user?.name || item.user || 'Unknown athlete'}</td><td>{item.durationMinutes ?? item.duration ?? 0} min</td><td>{item.calories ?? 0} kcal</td><td>{item.completedAt ? new Date(item.completedAt).toLocaleDateString() : 'Not completed'}</td></tr>)}</tbody></table></div>
	</CollectionPage>
}