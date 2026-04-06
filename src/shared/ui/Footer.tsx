import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-black/40 font-semibold min-h-fit p-4">
      <div className="grid grid-cols-3 justify-center">
        {/* - Logo e descrição - */}

        <div className="flex flex-col py-5 mx-10">
          <h1 className="text-2xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            PetMatch
          </h1>
          <p className="text-sm font-semibold text-black/70 mt-4">
            Conectando tutores para cruzamentos seguros e responsáveis.
          </p>
        </div>

        {/* - Links úteis - */}

        <div className="mx-[30%] py-5">
          <h1 className="text-lg font-bold text-black">Links Úteis</h1>

          <ul className="space-y-1">
            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline my-2 cursor-pointer font-semibold"
                to="/sobre"
                onClick={scrollToTop}
              >
                Sobre Nós
              </Link>
            </li>

            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline my-2 cursor-pointer font-semibold"
                to="/como-funciona"
                onClick={scrollToTop}
              >
                Como Funciona
              </Link>
            </li>

            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline my-2 cursor-pointer font-semibold"
                to="/termos-de-uso"
                onClick={scrollToTop}
              >
                Termos de Uso
              </Link>
            </li>

            <li>
              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline my-2 cursor-pointer font-semibold"
                to="/politica-de-privacidade"
                onClick={scrollToTop}
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* - Contato - */}

        <div className="py-5">
          <h1 className="text-lg font-bold text-black mb-3">Contato</h1>
          <p className="text-sm text-black mb-2">contato@petmatch.com</p>
          <p className="text-sm text-black mb-2">(99) 99999-9999</p>
        </div>
      </div>

      <div className="border-t border-black/20 flex mx-20">
        <span className="text-sm mx-auto mt-3">
          © {new Date().getFullYear()} <strong>PetMatch</strong> Todos os
          direitos reservados.
        </span>
      </div>
    </footer>
  );
};

export { Footer };
