export interface Tutor {
  id: string;
  user_id: string;
  photo_url?: string | null;
  name: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  created_at: string;
  validated_at?: string | null;
}
