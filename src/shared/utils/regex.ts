export const regex = {
  // Auth
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^(?!.*(.)\1{2,})[A-Za-zÀ-ÿ]+( [A-Za-zÀ-ÿ]+)*$/,
  password: /.../,

  // Registration
  petName: /^[\p{L}\s]*$/u,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  street: /^[\p{L}0-9\s.]*$/u,
  number: /^\d*$/,
  neighborhood: /^[\p{L}\s]*$/u,
  city: /^[\p{L}\s]*$/u,
  complement: /^[\p{L}0-9\s,]*$/u,
  state: /^[A-Z]{0,2}$/,
};
