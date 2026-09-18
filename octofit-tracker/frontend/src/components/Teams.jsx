import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Users.jsx'

export default function Teams() {
	const [items, setItems] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		fetchCollection('teams').then(setItems).catch((reason) => setError(reason.message))
	}, [])

	return <CollectionPage eyebrow="Teams" title="Better in formation" intro="Find your pace, then bring someone with you." error={error}>
		<div className="team-grid">{items.map((team, index) => <article className="team-card" key={team._id || team.id || index}><div className="team-icon">+</div><h2>{team.name || 'Untitled team'}</h2><p>{team.description || 'A new OctoFit team.'}</p><footer>{team.members?.length || 0} members <span>→</span></footer></article>)}</div>
	</CollectionPage>
}