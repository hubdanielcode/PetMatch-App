export const masks = {
  /* - Nome / */

  name: (value: string) =>
    value
      .replace(/[^a-zA-ZÀ-ÿ\s']/g, "")
      .replace(/\s+/g, " ")
      .trimStart()
      .slice(0, 30)
      .toLowerCase()
      .replace(/(^|\s|')\S/g, (firstCharacter) => firstCharacter.toUpperCase()),

  /* - Telefone - */

  phone: (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15),

  /* - CEP - */

  zipcode: (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9),

  /* - Número da casa - */

  number: (value: string) => value.replace(/\D/g, "").slice(0, 10),

  /* - Estado/UF - */

  uf: (value: string) =>
    value
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 2),

  /* - Cidade - */

  city: (value: string) =>
    value
      .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart(),

  /* - Bairro - */

  neighborhood: (value: string) =>
    value
      .replace(/[^a-zA-ZÀ-ÿ0-9\s-]/g, "")
      .replace(/\s+/g, " ")
      .trimStart(),
};
