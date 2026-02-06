import { useI18n } from "../contexts/I18nContext.jsx";

const Footer = () => {
    const { t } = useI18n();

    return (
        <h2>{t("footer.madeBy")}</h2>
    )
}

export default Footer