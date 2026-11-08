import { useEffect, useState } from 'react'
import axios from 'axios'
import BottomTabBar from '../../components/BottomTabBar'

const MyFoods = () => {
  const [foods, setFoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const accountResponse = await axios.get('http://localhost:3000/api/auth/foodPartner/account', {
          withCredentials: true,
        })
        const foodPartner = accountResponse.data.foodPartner || {}
        const foodPartnerId = foodPartner._id || foodPartner.id

        if (!foodPartnerId) {
          throw new Error('Food partner ID was not returned.')
        }

        const foodsResponse = await axios.get('http://localhost:3000/api/food/foodUploads', {
          params: { foodPartnerId },
          withCredentials: true,
        })
        setFoods(foodsResponse.data.foods || [])
      } catch (requestError) {
        if (requestError.response?.status === 404) {
          setFoods([])
        } else {
          console.error('Error fetching partner foods:', requestError)
          setError('Unable to load your foods.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadFoods()
  }, [])

  return (
    <main className="simple-page">
      <section className="simple-page-content my-foods-content">
        <span className="profile-kicker">Partner dashboard</span>
        <h1>Your Foods</h1>
        <p className="my-foods-subtitle">Manage the food videos you have shared with Foodly customers.</p>

        {isLoading && <p className="profile-state">Loading your foods...</p>}
        {error && <p className="logout-error" role="alert">{error}</p>}
        {!isLoading && !error && foods.length === 0 && (
          <p className="profile-state">You have not created any food videos yet.</p>
        )}

        <div className="my-foods-grid">
          {foods.map((food) => (
            <article className="my-food-card" key={food._id || food.id}>
              <video src={food.video} controls muted playsInline />
              <div>
                <h2>{food.name}</h2>
                <p>{food.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <BottomTabBar isFoodPartner />
    </main>
  )
}

export default MyFoods
