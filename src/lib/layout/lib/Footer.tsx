import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="container flex justify-center rounded-md bg-white p-2 dark:bg-gray-700">
      <a href="https://github.com/SavitskayaKseniya22" target="_blank">
        {t("footer.copy")}
      </a>
    </footer>
  );
}
