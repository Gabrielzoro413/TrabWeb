import { useState, useRef, useEffect } from "react";
import { useNavigate,Link, useLocation  } from "react-router-dom";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); 
  const location = useLocation();
  const isAuthPage = ["/", "/cadastro", "/senha"].includes(location.pathname);
  const isProfilePage = location.pathname === "/layout/perfil" || location.pathname === "/layout/perfileditar";

  // Se for página de login/cadastro/recuperar, não renderiza nada
  if (isAuthPage) return null;
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleLogout = () => {
  const confirmar = window.confirm("Tem certeza que deseja sair?");
  if (confirmar) {
    localStorage.clear(); // ou removeItem individualmente
    navigate("/");
  }
};


  const handleMeusDados = () => {
    navigate("/layout/perfil");
  };

  return (
    <div className="bg-blue-500  px-[100px]  py-[5px] flex flex-row justify-between relative">
      <Link to={"/layout/agendamentos"}>
        <img className="w-[5.9rem]" src={"https://unifor.br/o/unifor-theme/images/unifor-logo-horizontal-negative.svg"} alt="Logo Unifor" />
      </Link>
      
 {!isProfilePage && (
      <div ref={menuRef} className="relative">
        <div
          className="flex flex-row justify-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="flex items-center justify-center bg-white rounded-full w-10 h-10 object-cover "
>
            
        <img className="w-[4.9rem]" src={ "https://i.pravatar.cc/100"
} alt="Logo Unifor" />
            <i className="pi pi-user text-black text-lg" />
          </div>
          <div className="flex flex-col justify-center text-white ">🔽
          </div>
        </div>

        {menuOpen && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2  w-40 bg-white rounded-lg shadow-lg z-50 overflow-hidden">

            <button
              onClick={handleMeusDados}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >⚙️
              Meus dados
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-200"
            >➡️
            Sair
            </button>
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default Header;
