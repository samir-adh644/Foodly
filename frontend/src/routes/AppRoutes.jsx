import { BrowserRouter as Router,Route ,Routes} from "react-router-dom"
import UserLogin from '../pages/auth/UserLogin'
import UserRegister from '../pages/auth/UserRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import Home from "../pages/general/Home"
import CreateFood from "../pages/food-partner/CreateFood"
import Profile from "../pages/food-partner/Profile"
import Saved from "../pages/general/Saved"
import Account from "../pages/general/Account"
import MyFoods from "../pages/food-partner/MyFoods"

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
            {/* <Route path="/foodPartner/home" element={<Home isFoodPartner />} /> */}
            <Route path="/create-food" element={<CreateFood/>} />
            <Route path="/foodPartner/my-foods" element={<MyFoods />} />
            <Route path="/foodPartner/:id" element={<Profile/>} />
            <Route path="/saved" element={<Saved/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/foodPartner/account" element={<Account isFoodPartner />} />
        </Routes>
    </Router>
  )
}

export default AppRoutes
