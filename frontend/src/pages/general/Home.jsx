import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/BottomTabBar'
import Comments from '../../components/Comments'

const Home = ({ isFoodPartner = false }) => {
  const [videos, setVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)
  const [pendingActions, setPendingActions] = useState({})
  const [commentFoodId, setCommentFoodId] = useState(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const videoRefs = useRef([])
  const navigate = useNavigate()

  const visitStore = (video) => {
    const partner = video.foodPartner || {}
    const partnerId = typeof partner === 'object' ? partner._id || partner.id : partner
    navigate(`/foodPartner/${partnerId}`, {
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

  const handleAction = async (video, action) => {
    const actionKey = `${video._id}-${action}`
    if (pendingActions[actionKey]) return

    const endpoint = {
      like: '/like',
      comment: '/comment',
      save: '/save',
    }[action]
    const countKey = `${action}Count`
    const previousCount = video[countKey] || 0
    const isToggle = action === 'like' || action === 'save'
    const wasActive = Boolean(video[`_${action}d`])
    const nextActive = isToggle ? !wasActive : true
    const nextCount = isToggle
      ? Math.max(0, previousCount + (nextActive ? 1 : -1))
      : previousCount + 1

    setPendingActions((current) => ({ ...current, [actionKey]: true }))
    setVideos((current) => current.map((item) => (
      item._id === video._id
        ? { ...item, [countKey]: nextCount, [`_${action}d`]: nextActive }
        : item
    )))

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/food${endpoint}`, {
        foodId: video._id,
        ...(action === 'comment' ? { comment: 'Great food!' } : {}),
      }, { withCredentials: true })
    } catch (error) {
      console.error(`Error ${action}ing video:`, error)
      setVideos((current) => current.map((item) => (
        item._id === video._id
          ? { ...item, [countKey]: previousCount, [`_${action}d`]: wasActive }
          : item
      )))
    } finally {
      setPendingActions((current) => {
        const next = { ...current }
        delete next[actionKey]
        return next
      })
    }
  }

  // Verify the session before loading any home-page data.
  useEffect(() => {
    let isMounted = true
    const accountType = isFoodPartner ? 'foodPartner' : 'user'
    const loginPath = isFoodPartner ? '/foodPartner/login' : '/user/login'

    const loadHome = async () => {
      try {
        const accountResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/${accountType}/account`,
          { withCredentials: true },
        )

        const account = isFoodPartner
          ? accountResponse.data.foodPartner
          : accountResponse.data.user

        if (!account) {
          navigate(loginPath, { replace: true })
          return
        }

        if (!isMounted) return
        setIsAuthenticated(true)
        const foodResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/food`, {
          withCredentials: true,
        })

        if (isMounted) {
          setVideos(foodResponse.data.foodItems || [])
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate(loginPath, { replace: true })
        } else {
          console.error('Error loading home data:', error)
        }
      } finally {
        if (isMounted) setIsCheckingAuth(false)
      }
    }

    loadHome()

    return () => {
      isMounted = false
    }
  }, [isFoodPartner, navigate])

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

  if (isCheckingAuth || !isAuthenticated) {
    return (
      <main className="simple-page">
        {isCheckingAuth && <p className="profile-state">Checking your session...</p>}
      </main>
    )
  }

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

              <button
                type="button"
                aria-label={video._liked ? 'Unlike video' : 'Like video'}
                className={video._liked ? 'reel-action-active' : ''}
                onClick={() => handleAction(video, 'like')}
                disabled={pendingActions[`${video._id}-like`]}
              >
                <span>♡</span>
                <small>{video.likeCount || 0}</small>
              </button>

              <button
                type="button"
                aria-label="Comment on video"
                onClick={() => setCommentFoodId(video._id || video.id)}
              >
                <span>◌</span>
                <small>{video.commentCount || 0}</small>
              </button>

              <button
                type="button"
                aria-label={video._saved ? 'Unsave video' : 'Save video'}
                className={video._saved ? 'reel-action-active' : ''}
                onClick={() => handleAction(video, 'save')}
                disabled={pendingActions[`${video._id}-save`]}
              >
                <span>🔖</span>
                <small>{video.saveCount || 0}</small>
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

      <BottomTabBar isFoodPartner={isFoodPartner} />

      {commentFoodId && (
        <Comments
          foodId={commentFoodId}
          onClose={() => setCommentFoodId(null)}
          onCommentAdded={() => {
            setVideos((current) => current.map((item) => (
              (item._id || item.id) === commentFoodId
                ? { ...item, commentCount: (item.commentCount || 0) + 1 }
                : item
            )))
          }}
        />
      )}

    </main>
  )
}

export default Home
