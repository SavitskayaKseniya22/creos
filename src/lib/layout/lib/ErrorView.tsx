import { useTranslation } from "react-i18next";

export default function ErrorView() {
  const { t } = useTranslation();
  return <p className="m-auto">{t("error.text")}</p>;
}
