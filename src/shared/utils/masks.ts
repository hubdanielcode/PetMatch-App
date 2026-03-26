export const masks = {
  phone: (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15),

  cep: (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9),
};
