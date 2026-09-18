import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage } from './Users.jsx'

export default function Workouts() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setItems).catch((reason) => setError(reason.message))
  }, [])

  return <CollectionPage eyebrow="Workout library" title="A plan for today" intro="Thoughtful sessions for wherever you are in your journey." error={error}>
    <div className="workout-grid">{items.map((workout, index) => <article className="workout-card" key={workout._id || workout.id || index}><div className="workout-top"><span className="tag">{workout.difficulty || 'All levels'}</span><span>{workout.durationMinutes ?? workout.duration ?? 0} min</span></div><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.description || 'A flexible session for your next movement break.'}</p><div className="exercise-list">{(workout.exercises || []).map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div>
  </CollectionPage>
}