import { createContext, useState, type ReactNode } from "react";

interface ApplicationContextType {
  /* - Pet - */

  petPhoto: File | null;
  setPetPhoto: (petPhoto: File) => void;
  petName: string;
  setPetName: (petName: string) => void;
  species: string;
  setSpecies: (species: string) => void;
  breed: string;
  setBreed: (breed: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  pedigree: string;
  setPedigree: (pedigree: string) => void;
  pedigreeFile: File | null;
  setPedigreeFile: (pedigree: File) => void;
  vaccineFile: File | null;
  setVaccineFile: (vaccineFile: File) => void;
  mated: string;
  setMated: (mated: string) => void;

  /* - Tutor - */

  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  street: string;
  setStreet: (street: string) => void;
  complement: string;
  setComplement: (complement: string) => void;
  neighborhood: string;
  setNeighborhood: (neighborhood: string) => void;
  houseNumber: string;
  setHouseNumber: (houseNumber: string) => void;
  city: string;
  setCity: (city: string) => void;
  state: string;
  setState: (state: string) => void;
  zipcode: string;
  setZipcode: (zipcode: string) => void;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  /* - Pet - */

  const [petPhoto, setPetPhoto] = useState<File | null>(null);
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [pedigree, setPedigree] = useState("");
  const [pedigreeFile, setPedigreeFile] = useState<File | null>(null);
  const [vaccineFile, setVaccineFile] = useState<File | null>(null);
  const [mated, setMated] = useState("");

  /* - Tutor - */

  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  return (
    <ApplicationContext.Provider
      value={{
        /* - Pet - */

        petPhoto,
        setPetPhoto,
        petName,
        setPetName,
        species,
        setSpecies,
        breed,
        setBreed,
        gender,
        setGender,
        pedigree,
        setPedigree,
        pedigreeFile,
        setPedigreeFile,
        vaccineFile,
        setVaccineFile,
        mated,
        setMated,

        /* - Tutor - */

        phoneNumber,
        setPhoneNumber,
        street,
        setStreet,
        complement,
        setComplement,
        neighborhood,
        setNeighborhood,
        houseNumber,
        setHouseNumber,
        city,
        setCity,
        state,
        setState,
        zipcode,
        setZipcode,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationProvider };
