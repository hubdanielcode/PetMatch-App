import { FaPenAlt } from "react-icons/fa";
import { useRegistrationContext } from "../pet-registration";
import { useMemo, useState } from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const MyProfile = ({}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { photo, name, email, phoneNumber, city, state } =
    useRegistrationContext();

  const photoURL = useMemo(
    () => (photo ? URL.createObjectURL(photo) : null),
    [photo],
  );

  const myPets = [];

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-amber-100 via-orange-100 to-red-100">
      <div className="flex flex-col">
        <h1 className="text-black font-bold text-3xl p-10 ml-[15%]">
          Meu Perfil
        </h1>
        <div className="flex h-fit w-[25%] bg-linear-to-br from-amber-300 via-orange-300 to-red-300 px-2 py-1 gap-1 ml-[15%] rounded-full justify-center text-black font-semibold text-sm">
          <button className="border border-black/40 rounded-full bg-white px-4 py-1 min-w-[50%]">
            Minhas Informações
          </button>
          <button className="border border-black/40 rounded-full bg-white px-4 py-1 min-w-[50%]">
            Meus Pets
          </button>
        </div>
        <div className="flex flex-col bg-white p-10 mx-[15%] w-[70%] h-140 border border-black/40 rounded-lg mt-10">
          <div className="flex justify-between mx-6">
            <span className="text-black font-bold text-base">
              Informações do Tutor
            </span>
            <div className="flex border border-black/40 bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-4 py-2 font-semibold cursor-pointer">
              <FaPenAlt className="h-4 w-4 my-1 mr-2 text-white" />
              <button
                className="text-white cursor-pointer"
                onClick={() => setIsEditModalOpen(!isEditModalOpen)}
              >
                Editar
              </button>
            </div>
          </div>
          <div className="flex">
            <div
              className={`rounded-full h-25 w-25 border border-black/40 flex items-center justify-center ${photo ? "" : "bg-linear-to-br from-amber-600 via-orange-600 to-red-600"}`}
            >
              {photo ? (
                <img
                  className="rounded-full h-full w-full object-cover object-center"
                  src={photoURL!}
                  alt={name}
                />
              ) : (
                <span className="text-white font-bold text-2xl">
                  {name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex flex-col ml-5 mt-4">
              <p className="text-black font-semibold text-2xl mb-2">{name}</p>
              <p className="text-sm black/70">
                Tutor de {myPets.length} {myPets.length === 1 ? "pet" : "pets"}
              </p>
            </div>
          </div>

          <div className="flex w-full bg-gray-200 text-sm font-semibold border border-black/40 rounded-lg min-h-10 items-center px-4 py-2 my-8">
            <MdMail className="h-6 w-6 text-amber-600 mr-4" />
            <div className="flex flex-col mb-1">
              <p className="font-semibold text-base text-black/70">Email</p>
              <p className="font-semibold text-base">{email}</p>
            </div>
          </div>

          <div className="flex w-full bg-gray-200 text-sm font-semibold border border-black/40 rounded-lg min-h-10 items-center px-4 py-2 mb-8">
            <MdPhone className="h-6 w-6 text-amber-600 mr-4" />
            <div className="flex flex-col mb-1">
              <p className="font-semibold text-base text-black/70">Telefone</p>
              <p className="font-semibold text-base">{phoneNumber}</p>
            </div>
          </div>

          <div className="flex w-full bg-gray-200 text-sm font-semibold border border-black/40 rounded-lg min-h-10 items-center px-4 py-2 mb-8">
            <FaLocationDot className="h-6 w-6 text-amber-600 mr-4" />
            <div className="flex flex-col mb-1">
              <p className="font-semibold text-base text-black/70">
                Localização
              </p>
              <p className="font-semibold text-base">
                {city}, {state}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { MyProfile };
