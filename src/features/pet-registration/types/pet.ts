export interface Pet {
  id: string;
  user_id: string;
  photo_url: string;
  name: string;
  species: string;
  gender: string;
  breed: string;
  age: string;
  mated: boolean;
  pedigree?: boolean;
  cryptorchidism_bilateral: boolean | null;
  cryptorchidism_unilateral: boolean | null;
  vaccinated: boolean;
  created_at: string;
}
