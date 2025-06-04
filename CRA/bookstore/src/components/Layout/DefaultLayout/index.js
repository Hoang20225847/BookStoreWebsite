import Header from "./Header";
import Sidebar from "./SideBar";
import Footer from "./Footer";
function DefaultLayout({children}) {
    return ( <div>
        <Header/>
        <div className="Container">
        <div className="app__container">
        <div className="grid">

            <div className="grid__row app__content">
            <Sidebar />
            
                {children}
            
        </div>
        </div>
        </div>
        </div>
        <Footer/>
    </div> );
}

export default DefaultLayout;