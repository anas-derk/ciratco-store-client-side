import Head from "next/head";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAnimationSettings, getInitialStateForElementBeforeAnimation, getUserInfo, handleSelectUserLanguage } from "../../../public/global_functions/popular";
import Footer from "@/components/Footer";
import { motion } from "motion/react";

export default function PolicesTermsAndConditions() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [errorMsgOnLoadingThePage, setErrorMsgOnLoadingThePage] = useState("");

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const userLanguage = localStorage.getItem(process.env.USER_LANGUAGE_FIELD_NAME_IN_LOCAL_STORAGE);
        handleSelectUserLanguage(userLanguage === "ar" || userLanguage === "en" || userLanguage === "tr" || userLanguage === "de" ? userLanguage : "en", i18n.changeLanguage);
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem(process.env.USER_TOKEN_NAME_IN_LOCAL_STORAGE);
        if (userToken) {
            getUserInfo()
                .then((result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.USER_TOKEN_NAME_IN_LOCAL_STORAGE);
                    }
                    setIsLoadingPage(false);
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        localStorage.removeItem(process.env.USER_TOKEN_NAME_IN_LOCAL_STORAGE);
                        setIsLoadingPage(false);
                    }
                    else {
                        setIsLoadingPage(false);
                        setErrorMsgOnLoadingThePage(err?.message === "Network Error" ? "Network Error" : "Sorry, Something Went Wrong, Please Try Again !");
                    }
                });
        } else {
            setIsLoadingPage(false);
        }
    }, []);

    return (
        <div className="privacy-policy-and-conditions caption-page page pt-5">
            <Head>
                <title>{t(process.env.STORE_NAME)} - {t("Polices Terms And Conditions")}</title>
            </Head>
            {!isLoadingPage && !errorMsgOnLoadingThePage && <>
                <Header />
                <div className="page-content text-white ps-4 pe-4 pb-5">
                    <div className="container-fluid">
                        <motion.h1
                            className="welcome-msg mb-5 border-bottom border-2 pb-3 w-fit mx-auto"
                            initial={getInitialStateForElementBeforeAnimation()}
                            whileInView={getAnimationSettings}
                        >{t("Polices-Terms & Conditions")}</motion.h1>
                        <motion.h2
                            className="welcome-msg mb-5 border-bottom border-2 pb-3 w-fit mx-auto"
                            initial={getInitialStateForElementBeforeAnimation()}
                            whileInView={getAnimationSettings}
                        >{t("Page links (footer)")}</motion.h2>
                        <div className="content">
                            <motion.h2
                                className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                initial={getInitialStateForElementBeforeAnimation()}
                                whileInView={getAnimationSettings}
                            >{t("Legal Notice")}</motion.h2>
                            <ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Angaben gemäß § 5 TMG")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Unternehmensname: CIRAT Inh. Amr Asfour")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Vorname: Amr")} .</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Nachname: Asfour")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Adresse: Neustadter Str. 61, 68309 Mannheim, Deutschland")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Telefonnummer: 4917682988660")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("E-Mail: info@ciratco.com")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("USt-IdNr. DE 356382264 (gemäß § 27 a Umsatzsteuergesetz)")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Ergänzende Angaben: Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten geschaffen. Die Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen. Nähere Informationen sind unter dem folgenden Link verfügbar: [http://ec.europa.eu/consumers/odr](http://ec.europa.eu/consumers/odr). Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir weder bereit noch verpflichtet")}</motion.li>
                            </ul>
                            <motion.h2
                                className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                initial={getInitialStateForElementBeforeAnimation()}
                                whileInView={getAnimationSettings}
                            >{t("Privacy Policy")}</motion.h2>
                            <hr />
                            <motion.h2
                                className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                initial={getInitialStateForElementBeforeAnimation()}
                                whileInView={getAnimationSettings}
                            >{t("Terms And Conditions")}</motion.h2>
                            <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("As of January 31, 2025")}</motion.p>
                            <ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Scope of application")} :</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("These General Terms and Conditions (GTC) apply to all deliveries by CIRAT owner Amr Asfour (sole proprietorship) (hereinafter CIRAT) to consumers")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Consumer means any natural person who enters into a legal transaction for purposes that are predominantly neither commercial nor self-employed professional activities")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Contract partner")} :</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The purchase contract is concluded with CIRAT, owner: Amr Asfour, Neustadter Str. 61, 68309 Mannheim, phone number: +49 176 82988660, e-mail: info@ciratco.com")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Conclusion of contract")} :</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The presentation of products in the online shop does not constitute a legally binding offer but only an invitation to order")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("By clicking the Buy/order with charge button you place a binding order for the goods listed on the order page. Your purchase contract is concluded when we accept your order by sending you an order confirmation by e-mail immediately after receiving your order")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Right of withdrawal")} :</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you are a consumer (i.e., a natural person who places the order for a purpose that can neither be predominantly attributed to your commercial nor your independent professional activity), you have a right of withdrawal in accordance with the statutory provisions")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you as a consumer make use of your right of withdrawal according to clause 4.1, you bear the regular costs of returning the goods")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Otherwise, the regulations set out in the following withdrawal instruction apply in detail")}</motion.li>
                                    <motion.h2
                                        className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                        initial={getInitialStateForElementBeforeAnimation()}
                                        whileInView={getAnimationSettings}
                                    >{t("Right of withdrawal")}</motion.h2>
                                    <ul>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You have the right to withdraw from this contract within fourteen days without giving any reason")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The withdrawal period is fourteen days from the day on which you or a third party named by you, who is not the carrier, have taken possession of the goods")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("To exercise your right of withdrawal, you must inform us CIRAT, Neustadter Str. 61, 68309 Mannheim, Telephone: +49 176 82988660, Email: info@ciratco.com")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("by means of a clear statement (e.g., a letter sent by post or an email) informing us of your decision to withdraw from this contract")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You may use the attached model withdrawal form, but it is not obligatory")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You can also electronically fill in and submit the model withdrawal form or any other clear statement on our website (insert internet address)")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you use this option, we will promptly (e.g., by email) send you a confirmation of receipt of such withdrawal")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("To meet the withdrawal deadline, it is sufficient for you to send your communication exercising the right of withdrawal before the withdrawal period expires")}</motion.li>
                                    </ul>
                                    <motion.h2
                                        className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                        initial={getInitialStateForElementBeforeAnimation()}
                                        whileInView={getAnimationSettings}
                                    >{t("Consequences of withdrawal")}</motion.h2>
                                    <ul>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you withdraw from this contract, we shall reimburse all payments received from you, including delivery costs (except for the additional costs arising if you chose a delivery method other than the least expensive standard delivery offered by us), without undue delay and no later than fourteen days from the day we receive the notification of your withdrawal from this contract")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("For this refund, we use the same payment method that you used in the original transaction, unless you have expressly agreed otherwise; in no case will you be charged fees for this refund")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("We may refuse the refund until we have received the goods back or until you have provided proof that you have sent the goods back, whichever is earlier")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You must return or hand over the goods to us or to the person authorized by you to receive the goods (name and address to be inserted here if applicable) without undue delay and in any case no later than fourteen days from the day on which you inform us of the withdrawal of this contract. The deadline is met if you send the goods before the expiry of the fourteen-day period")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie tragen die unmittelbaren Kosten der Rücksendung der Waren")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist")}</motion.li>
                                    </ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Über das Muster-Widerrufsformular informiert CIRAT nach der gesetzlichen Regelung wie folgt")} :</motion.li>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Muster-Widerrufsformular")}</motion.p>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)")}</motion.p>
                                    <ul>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("An CIRAT, Neustadter Str. 61, 68309 Mannheim, E-Mail: info@ciratco.com")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Hiermit widerrufe(n) ich/wir () den von mir/uns () abgeschlossenen Vertrag über den Kauf der folgenden Waren ()/die Erbringung der folgenden Dienstleistung ()")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Bestellt am ()/erhalten am ()")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Name des/der Verbraucher(s)")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Anschrift des/der Verbraucher(s)")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Datum ____")}</motion.li>
                                    </ul>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(*) Unzutreffendes streichen")}</motion.p>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Preise und Versandkosten")}</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die auf den Produktseiten genannten Preise enthalten die gesetzliche Mehrwertsteuer und sonstige Preisbestandteile")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Zusätzlich zu den angegebenen Preisen berechnen wir für die Lieferung innerhalb Deutschlands pauschal 0-10 Euro pro Bestellung. Die Versandkosten werden Ihnen auf den Produktseiten, im Warenkorbsystem und auf der Bestellseite nochmals deutlich mitgeteilt")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Bei Zahlung per Nachnahme wird zusätzlich eine Gebühr in Höhe von 5 Euro fällig, die der Zusteller vor Ort erhebt. Weitere Steuern oder Kosten fallen nicht an")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Lieferung")}</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Lieferung erfolgt nur innerhalb Deutschlands mit der deutsche Post, DHL, Hermes oder DPD")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Lieferzeit beträgt bis zu 3 Tage. Auf eventuell abweichende Lieferzeiten weisen wir auf der jeweiligen Produktseite hin")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Zahlung")}</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Zahlung erfolgt wahlweise per Vorkasse oder Nachnahme")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Bei Auswahl der Zahlungsart Vorkasse nennen wir Ihnen unsere Bankverbindung in der Auftragsbestätigung und liefern die Ware nach Zahlungseingang")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Eigentumsvorbehalt")}</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Bis zur vollständigen Zahlung bleibt die Ware unser Eigentum")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sachmängelgewährleistung")}</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("CIRAT haftet für Sachmängel nach den hierfür geltenden gesetzlichen Vorschriften, insbesondere §§ 434 ff. Bürgerliches Gesetzbuch")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Streitbeilegung")}</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten geschaffen")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Nähere Informationen sind unter dem folgenden Link verfügbar: http://ec.europa.eu/consumers/odr(http://ec.europa.eu/consumers/odr)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Wir sind zur Beilegung von Streitigkeiten mit Verbrauchern zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle bereit oder gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz) verpflichtet")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die zuständige Verbraucherschlichtungsstelle ist: Universalschlichtungsstelle des Bundes Zentrum für Schlichtung e.V., Straßburger Straße 8, 77694 Kehl am Rhein, www.verbraucher-schlichter.de(http://www.verbraucher-schlichter.de)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Zur Beilegung der genannten Streitigkeiten werden wir in einem Streitbeilegungsverfahren vor dieser Stelle teilnehmen")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Alternativ")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten geschaffen")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen. Nähere Informationen sind unter dem folgenden Link verfügbar: http://ec.europa.eu/consumers/odr(http://ec.europa.eu/consumers/odr)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir weder bereit noch verpflichtet")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Widerrufsrecht")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(Bitte Ziffern aus dem AGB entnehmen)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Wenn Sie Verbraucher sind (also eine natürliche Person, die die Bestellung zu einem Zweck abgibt, der weder Ihrer gewerblichen oder selbständigen beruflichen Tätigkeit zugerechnet werden kann), steht Ihnen nach Maßgabe der gesetzlichen Bestimmungen ein Widerrufsrecht zu")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Machen Sie als Verbraucher von Ihrem Widerrufsrecht nach Ziffer 4.1 Gebrauch, so haben Sie die regelmäßigen Kosten der Rücksendung zu tragen")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Im Übrigen gelten für das Widerrufsrecht die Regelungen, die im Einzelnen wiedergegeben sind in der folgenden *Widerrufsbelehrung *")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Widerrufsrecht")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Um Ihr Widerrufsrecht auszuüben, müssen Sie uns CIRAT, Neustadter Str. 61, 68309 Mannheim, Telefonnummer: +49 176 82988660, E-Mail: ciratbusiness@gmail.com mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie können das Muster-Widerrufsformular oder eine andere eindeutige Erklärung auch auf unserer Webseite (Internet-Adresse einfügen) elektronisch ausfüllen und übermitteln")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Machen Sie von dieser Möglichkeit Gebrauch, so werden wir Ihnen unverzüglich (z. B. per E-Mail) eine Bestätigung über den Eingang eines solchen Widerrufs übermitteln")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Folgen des Widerrufs")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrages unterrichten, an uns oder an hier sind gegebenenfalls der Name und die Anschrift der von Ihnen zur Entgegennahme der Ware ermächtigten Person einzufügen zurückzusenden oder zu übergeben")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You bear the immediate costs of returning the goods")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You only have to pay for any diminished value of the goods if the loss in value is due to handling other than what is necessary to establish the nature, characteristics and functioning of the goods")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("End of withdrawal instructions")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("CIRAT informs about the model withdrawal form according to legal regulations as follows")} :</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Model withdrawal form")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(If you want to withdraw from the contract, please fill out this form and send it back)")}</motion.li>
                                </ul>
                            </ol>
                        </div>
                    </div>
                </div>
                <Footer />
            </>}
            {isLoadingPage && !errorMsgOnLoadingThePage && <LoaderPage />}
            {errorMsgOnLoadingThePage && <ErrorOnLoadingThePage errorMsg={errorMsgOnLoadingThePage} />}
        </div>
    );
}