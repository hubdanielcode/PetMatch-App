export interface Pet {
  id: string;
  user_id: string;
  photo_url: string;
  name: string;
  species: string;
  gender: string;
  breed: string;
  age: string;
  mated: boolean | null;
  pedigree?: boolean | null;
  cryptorchidism_bilateral: boolean | null;
  cryptorchidism_unilateral: boolean | null;
  vaccinated: boolean | null;
  created_at: string;

  city?: string | null;
  state?: string | null;
}
