import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [videos, setVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)
  const videoRefs = useRef([])
  const navigate = useNavigate()

  const visitStore = (video) => {
    const partner = video.foodPartner || {}

    

    navigate(`/foodPartner/${partner}`, {
      state: {
        restaurant: {
          name: partner.name || video.restaurantName || 'Green Table Kitchen',
          address: partner.address || video.address || '24 Market Street, Portland',
          image: partner.image || partner.profileImage || video.profileImage,
          customersServed: partner.customersServed || video.customersServed || '15K',
          totalMeals: partner.totalMeals || video.totalMeals,
        },
        selectedVideo: video,
      },
    })
  }

  // Fetch videos from backend
  useEffect(() => {
    axios.get("http://localhost:3000/api/food",{
      withCredentials:true
    })
      .then(response => {
        setVideos(response.data.foodItems)
      })
      .catch(error => {
        console.error("Error fetching food videos:", error)
      })
  }, [])

  // Handle video autoplay and pause
  useEffect(() => {
    if (videos.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index)

            setActiveVideo(index)

            videoRefs.current.forEach((video, videoIndex) => {
              if (!video) return

              if (videoIndex === index) {
                video.play().catch(() => {})
              } else {
                video.pause()
              }
            })
          }
        })
      },
      { threshold: 0.65 }
    )

    videoRefs.current.forEach((video) => {
      const reel = video?.closest('.reel')

      if (reel) {
        observer.observe(reel)
      }
    })

    return () => observer.disconnect()
  }, [videos])

  return (
    <main className="reels-page">

      <header className="reels-header">

        <a className="reels-brand" href="/" aria-label="Foodly home">
          <span className="reels-brand-mark">F</span>foodly
        </a>

        <div className="feed-tabs" aria-label="Feed type">
          <button className="feed-tab" type="button">
            Following
          </button>

          <button className="feed-tab feed-tab-active" type="button">
            For you
          </button>
        </div>

        <button className="search-button" type="button" aria-label="Search restaurants">
          ⌕
        </button>

      </header>

      <section className="reels-feed" aria-label="Food videos">

        {videos.map((video, index) => (

          <article
            className="reel"
            data-index={index}
            key={video._id}
          >

            <video
              ref={(element) => {
                videoRefs.current[index] = element
              }}
              className="reel-video"
              src={video.video}
              loop
              muted
              playsInline
              autoPlay={index === 0}
              aria-label={`${video.name} food video`}
            />

            <div className="reel-shade" />

            <div className="reel-content">

              <div className="reel-copy">

                <span className="reel-kicker">
                  Featured nearby
                </span>

                <h1>{video.name}</h1>

                <p>{video.description}</p>

                  <button className="visit-button" type="button" onClick={() => visitStore(video)}>
                  Visit Store <span aria-hidden="true">→</span>
                </button>

              </div>

              <div className="reel-meta">

                <button className="follow-button" type="button">
                  Follow
                </button>

              </div>

            </div>

            <div className="reel-actions" aria-label={`${video.name} actions`}>

              <button type="button" aria-label="Like video">
                <span>♡</span>
                <small>1.2k</small>
              </button>

              <button type="button" aria-label="Comment on video">
                <span>◌</span>
                <small>84</small>
              </button>

              <button type="button" aria-label="Share video">
                <span>↗</span>
                <small>Share</small>
              </button>

            </div>

          </article>

        ))}

      </section>

      <div
        className="feed-progress"
        aria-label={`Video ${activeVideo + 1} of ${videos.length}`}
      >

        {videos.map((video, index) => (

          <span
            className={index === activeVideo ? 'progress-active' : ''}
            key={video._id}
          />

        ))}

      </div>

    </main>
  )
}

export default Home
