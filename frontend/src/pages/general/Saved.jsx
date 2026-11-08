import { useEffect, useState } from 'react'
import axios from 'axios'
import BottomTabBar from '../../components/BottomTabBar'

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/food/savedFoods`, { withCredentials: true })
      .then((response) => {
        setSavedVideos(response.data.savedFoods || [])
      })
      .catch((error) => {
        if (error.response?.status !== 404) console.error('Error fetching saved videos:', error)
        setSavedVideos([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="simple-page">
      <section className="simple-page-content">
        <span className="profile-kicker">Your collection</span>
        <h1>Saved videos</h1>

        {loading && <p className="profile-state">Loading saved videos...</p>}
        {!loading && savedVideos.length === 0 && (
          <p className="profile-state">You have no saved videos yet.</p>
        )}

        <div className="saved-grid">
          {savedVideos.map(({ food }) => food && (
            <article className="saved-card" key={food._id}>
              <video src={food.video} controls muted playsInline />
              <h2>{food.name}</h2>
              <p>{food.description}</p>
            </article>
          ))}
        </div>
      </section>
      <BottomTabBar />
    </main>
  )
}

export default Saved
