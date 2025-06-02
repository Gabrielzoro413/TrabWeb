import Header from "../componentes/Header" 

import { Outlet } from "react-router-dom";

function Layout(){ 

return (

  <div>

    <Header />

    <main className="p-4">

      <Outlet />

    </main>

  </div>

) 

} 


export default Layout;