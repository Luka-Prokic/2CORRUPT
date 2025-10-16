import i18next from "i18next"; // import your i18n instance directly

export function translateBodyPart(bodyPart: string) {
  const normalizedBodyPart = bodyPart.toLowerCase().replace(/\s+/g, "-");
  return i18next.t(`body-parts.${normalizedBodyPart}`);
}
