import { useTranslation } from "react-i18next";

export function useTranslatedBodyPart(bodyPart: string) {
  const { t } = useTranslation();

  const normalizedBodyPart = bodyPart.toLowerCase().replace(/\s+/g, "-");

  return t(`body-parts.${normalizedBodyPart}`);
}
