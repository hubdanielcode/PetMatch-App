import { Link } from "react-router-dom";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-black/40 font-semibold p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
        {/* - Logo e descrição - */}

        <div className="flex flex-col py-3">
          <h1 className="text-2xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            PetMatch
          </h1>

          <p className="text-sm text-black/70 mt-4 max-w-xs">
            Conectando tutores para cruzamentos seguros e responsáveis.
          </p>
        </div>

        {/* - Links úteis - */}

        <div className="py-3">
          <h1 className="text-lg font-bold text-black mb-2">Links Úteis</h1>

          <ul className="space-y-1">
            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline cursor-pointer font-semibold"
                to="/sobre"
                onClick={scrollToTop}
              >
                Sobre Nós
              </Link>
            </li>

            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline cursor-pointer font-semibold"
                to="/como-funciona"
                onClick={scrollToTop}
              >
                Como Funciona
              </Link>
            </li>

            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline cursor-pointer font-semibold"
                to="/termos-de-uso"
                state={{ from: location.pathname }}
                onClick={() => scrollToTop}
              >
                Termos de Uso
              </Link>
            </li>

            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline cursor-pointer font-semibold"
                to="/politica-de-privacidade"
                state={{ from: location.pathname }}
                onClick={scrollToTop}
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* - Contato - */}

        <div className="py-3">
          <h1 className="text-lg font-bold text-black mb-3">Contato</h1>

          <p className="text-sm text-black mb-2">contato@petmatch.com</p>

          <p className="text-sm text-black mb-2">(99) 99999-9999</p>
        </div>
      </div>

      <div className="border-t border-black/20 mt-6 pt-4 flex justify-center px-4">
        <span className="text-sm text-center">
          © {new Date().getFullYear()} <strong>PetMatch</strong> Todos os
          direitos reservados.
        </span>
      </div>
    </footer>
  );
};

export { Footer };
