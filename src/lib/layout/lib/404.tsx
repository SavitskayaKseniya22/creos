import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return <p className="m-auto">{t("error.404")}</p>;
}
