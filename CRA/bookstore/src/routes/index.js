import Home from '../pages/Home';
import Filter from '../pages/Filter';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import LoginAdmin from '../pages/LoginAdmin';
import Regis from '../pages/Regis';
import Details from '../pages/Details';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Purchase from '../pages/Purchase';
import Address from '../pages/Address';
import ManageBook from '../pages/ManageBook';
import ManageUser from '../pages/ManageUser';
import ManageOrder from '../pages/ManageOrder';
import Password  from '../pages/Password';
import Category from '../pages/Categori';
import {ProfileLayout} from '../components/Layout'
import {DetailLayout} from '../components/Layout'
import {LoginLayout}           from '../components/Layout'
import {CartLayout} from '../components/Layout'
import {AdminLayout} from '../components/Layout'




//Public routes
const PublicRoutes = [
 { path:'/',component:Home},
 { path:'/search',component:Category},
 { path:'/filter',component:Filter},
 { path:'/login',component:Login,Layout:LoginLayout},
 { path:'/regis',component:Regis,Layout:LoginLayout},
 { path:"/details/:slug",component:Details,Layout:DetailLayout},
  {path:"/admin/login",component:LoginAdmin,Layout:LoginLayout},
  

 



]
const PrivateRoutes = [
 { path:'/profile',component:Profile,Layout:ProfileLayout},
  { path:'/cart',component:Cart,Layout:CartLayout},
   { path:'/profile/address',component:Address,Layout:ProfileLayout},
 { path:'/profile/password',component:Password,Layout:ProfileLayout},
 { path:'/profile/purchase',component:Purchase,Layout:ProfileLayout},
  {path:'/checkout',component:Checkout,Layout:CartLayout}
]
const AdminRoutes=[
  {path:"/admin",component:ManageBook,Layout:AdminLayout},
  {path:"/admin/Users",component:ManageUser,Layout:AdminLayout},
   {path:"/admin/Orders",component:ManageOrder,Layout:AdminLayout}
]
export {PublicRoutes,PrivateRoutes,AdminRoutes}