import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



const getProfile = (data) => data?.foodPartner || data?.partner || data?.user || data || {}

const Profile = () => {
  const {id} = useParams();
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProfile = async () => {
      try {
        const [profileResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/foodPartner/${id}`, { withCredentials: true })
        ])

        if (!isMounted) return

        setProfile(getProfile(profileResponse.data))
        setVideos(profileResponse.data.foodPartner.foodItems)
      } catch {
        if (!isMounted) return

        try {
          const videosResponse = await axios.get(`${API_URL}/food`, { withCredentials: true })
          if (!isMounted) return
          setVideos(videosResponse.data.foodItems || [])
          setProfile((currentProfile) => currentProfile || DEMO_PROFILE)
          setError('Restaurant details are not available from the current account.')
        } catch (videoError) {
          if (isMounted) setError(videoError.response?.data?.message || 'We could not load this restaurant.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProfile()
    return () => { isMounted = false }
  }, [])

  const restaurantName = profile?.name || profile?.businessName || 'Your restaurant'
  const address = profile?.address || 'Restaurant address unavailable'
  const image = profile?.image || profile?.profileImage || profile?.logo || profile?.imageUrl
  const customers = profile?.customersServed ?? profile?.totalCustomers ?? profile?.customers ?? 'N/A'
  const mealCount = profile?.totalMeals ?? profile?.mealsCount ?? videos.length

  return (
    <main className="profile-page">
      <header className="profile-header">
        <a className="profile-brand" href="/" aria-label="Foodly home"><span className="profile-brand-mark">F</span>foodly</a>
        <span className="profile-kicker">Partner profile</span>
      </header>

      <section className="profile-content" aria-labelledby="restaurant-name">
        {loading ? <p className="profile-state">Loading restaurant profile...</p> : (
          <>
            <div className="restaurant-overview">
              <div className="restaurant-avatar" aria-label={`${restaurantName} logo`}>
                {image ? <img src={image} alt="" /> : <span>{restaurantName.slice(0, 1).toUpperCase()}</span>}
              </div>

              <div className="restaurant-details">
                <div className="restaurant-heading">
                  <span className="eyebrow">Welcome to</span>
                  <h1 id="restaurant-name">{restaurantName}</h1>
                  <p>{address}</p>
                </div>

                <div className="restaurant-stats" aria-label="Restaurant statistics">
                  <div><strong>{mealCount}</strong><span>Total meals</span></div>
                  <div><strong>{customers}</strong><span>Customers served</span></div>
                </div>
              </div>
            </div>

            {error && <p className="profile-notice" role="status">{error}</p>}

            <div className="gallery-heading">
              <div><span className="eyebrow">From our kitchen</span><h2>Video gallery</h2></div>
              <span>{videos.length} {videos.length === 1 ? 'video' : 'videos'}</span>
            </div>

            {videos.length === 0 ? <p className="profile-empty">No videos are available for this restaurant yet.</p> : (
              <div className="video-gallery" aria-label="Restaurant video gallery">
{videos.map((video, index) => (
  <button
    className="video-tile"
    key={video._id || video.video || index}
    type="button"
    onClick={() => setActiveVideo(video)}
    aria-label={`Play ${video.name || 'restaurant'} video`}
  >
    <video
      src={video.video}
      preload="metadata"
      muted
      className="video-thumbnail"
    />

    {/* <span className="video-play" aria-hidden="true" /> */}

    <span className="video-tile-label">
      {video.name || `Video ${index + 1}`}
    </span>
  </button>
))}
              </div>
            )}
          </>
        )}
      </section>

      {activeVideo && <div className="video-modal" role="dialog" aria-modal="true" aria-label="Video player" onClick={() => setActiveVideo(null)}>
        <div className="video-modal-card" onClick={(event) => event.stopPropagation()}>
          <button className="video-modal-close" type="button" onClick={() => setActiveVideo(null)} aria-label="Close video">x</button>
          <video src={activeVideo.video} controls autoPlay playsInline />
          <h2>{activeVideo.name || 'Restaurant video'}</h2>
        </div>
      </div>}
    </main>
  )
}

export default Profile
