import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();
  console.error(error);

  return <p className="m-auto">{t("error.text")}</p>;
}
