import { BrowserRouter as Router,Route ,Routes} from "react-router-dom"
import UserLogin from '../pages/auth/UserLogin'
import UserRegister from '../pages/auth/UserRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import Home from "../pages/general/Home"
import CreateFood from "../pages/food-partner/CreateFood"

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/user/register" element={<UserRegister />}/>
            <Route path="/user/login" element={<UserLogin />}/>
            <Route path="/user/logout" element={<h1>User Logout</h1>}/>
            <Route path="/foodPartner/register" element={<FoodPartnerRegister />}/>
            <Route path="/foodPartner/login" element={<FoodPartnerLogin />}/>
            <Route path="/foodPartner/logout" element={<h1>FoodPartner Logout</h1>}/>
            <Route path="/" element={<Home/>} />
            <Route path="/create-food" element={<CreateFood/>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes
