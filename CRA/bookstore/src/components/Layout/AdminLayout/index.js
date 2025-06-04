
import Sidebar from "./SideBar";
import Header from "./Header"
function AdminLayout({children}) {
    return ( <div className="AdminWrapper">
       <Sidebar></Sidebar>
            <div className="grid__column-10 AdminContent">
            <Header></Header>
            {children}
            </div>
    </div> );
}

export default AdminLayout;