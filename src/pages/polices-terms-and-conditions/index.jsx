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
                            >{t("Impressum")}</motion.h2>
                            <ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Angaben gemäß § 5 TMG")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Unternehmensname: CIRAT Inh. Amr Asfour")} .</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Vorname: Amr")} .</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Nachname: Asfour")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Adresse: Neustadter Str. 61, 68309 Mannheim, Deutschland")} .</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Telefonnummer: 4917682988660")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("E-Mail: info@ciratco.com ")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("USt-IdNr. DE 356382264 (gemäß § 27 a Umsatzsteuergesetz)")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Ergänzende Angaben: Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten geschaffen. Die Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen. Nähere Informationen sind unter dem folgenden Link verfügbar: [http://ec.europa.eu/consumers/odr](http://ec.europa.eu/consumers/odr). Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir weder bereit noch verpflichtet")} .</motion.li>
                            </ul>
                            <motion.h2
                                className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                initial={getInitialStateForElementBeforeAnimation()}
                                whileInView={getAnimationSettings}
                            >{t("Datenschutzerklärung")}</motion.h2>
                            <hr />
                            <motion.h2
                                className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                initial={getInitialStateForElementBeforeAnimation()}
                                whileInView={getAnimationSettings}
                            >{t("ALLGEMEINE GESCHÄFTSBEDINGUNGEN")}</motion.h2>
                            <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(Stand: 31. Januar 2025)")} .</motion.p>
                            <ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Geltungsbereich")} :</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Für alle Lieferungen von CIRAT Inh. Amr Asfour (Einzelunternehmen) (nachfolgend CIRAT) an Verbraucher gelten diese Allgemeinen Geschäftsbedingungen (AGB).")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu einem Zwecke abschließt, der überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden kann.")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Vertragspartner")} :</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Der Kaufvertrag kommt zustande mit CIRAT, Inhaber: Amr Asfour, Neustadter Str. 61, 68309 Mannheim, Telefonnummer: +49 176 82988660, E-Mail: info@ciratco.com")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Vertragsschluss")} :</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern nur eine Aufforderung zur Bestellung dar.")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Durch Anklicken des Buttons Kaufen/kostenpflichtig bestellen geben Sie eine verbindliche Bestellung der auf der Bestellseite aufgelisteten Waren ab. Ihr Kaufvertrag kommt zustande, wenn wir Ihre Bestellung durch eine Auftragsbestätigung per E-Mail unmittelbar nach dem Erhalt Ihrer Bestellung annehmen.")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Widerrufsrecht")} :</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("enn Sie Verbraucher sind (also eine natürliche Person, die die Bestellung zu einem Zweck abgibt, der weder Ihrer gewerblichen oder selbständigen beruflichen Tätigkeit zugerechnet werden kann), steht Ihnen nach Maßgabe der gesetzlichen Bestimmungen ein Widerrufsrecht zu.")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Machen Sie als Verbraucher von Ihrem Widerrufsrecht nach Ziffer 4.1 Gebrauch, so haben Sie die regelmäßigen Kosten der Rücksendung zu tragen .")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Im Übrigen gelten für das Widerrufsrecht die Regelungen, die im Einzelnen wiedergegeben sind in der folgenden Widerrufsbelehrung .")}</motion.li>
                                    <motion.h2
                                        className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                        initial={getInitialStateForElementBeforeAnimation()}
                                        whileInView={getAnimationSettings}
                                    >{t("Widerrufsrecht")}</motion.h2>
                                    <ul>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Um Ihr Widerrufsrecht auszuüben, müssen Sie uns CIRAT, Neustadter Str. 61, 68309 Mannheim, Telefonnummer: +49 176 82988660, E-Mail: info@ciratco.com")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie können das Muster-Widerrufsformular oder eine andere eindeutige Erklärung auch auf unserer Webseite (Internet-Adresse einfügen) elektronisch ausfüllen und übermitteln")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Machen Sie von dieser Möglichkeit Gebrauch, so werden wir Ihnen unverzüglich (z. B. per E-Mail) eine Bestätigung über den Eingang eines solchen Widerrufs übermitteln")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden")} .</motion.li>
                                    </ul>
                                    <motion.h2
                                        className="fw-bold mb-4 h4 border-bottom border-2 w-fit pb-2"
                                        initial={getInitialStateForElementBeforeAnimation()}
                                        whileInView={getAnimationSettings}
                                    >{t("Folgen des Widerrufs")}</motion.h2>
                                    <ul>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrages unterrichten, an uns oder an hier sind gegebenenfalls der Name und die Anschrift der von Ihnen zur Entgegennahme der Ware ermächtigten Person einzufügen zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie tragen die unmittelbaren Kosten der Rücksendung der Waren")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist")} .</motion.li>
                                    </ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Über das Muster-Widerrufsformular informiert CIRAT nach der gesetzlichen Regelung wie folgt")} :</motion.li>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Muster-Widerrufsformular")} .</motion.p>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)")} .</motion.p>
                                    <ul>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("An CIRAT, Neustadter Str. 61, 68309 Mannheim, E-Mail: info@ciratco.com")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Hiermit widerrufe(n) ich/wir () den von mir/uns () abgeschlossenen Vertrag über den Kauf der folgenden Waren ()/die Erbringung der folgenden Dienstleistung ()")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Bestellt am ()/erhalten am ()")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Name des/der Verbraucher(s)")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Anschrift des/der Verbraucher(s)")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)")} .</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Datum ____")} .</motion.li>
                                    </ul>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(*) Unzutreffendes streichen")} .</motion.p>
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
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Die Lieferzeit beträgt bis zu 3 Tage. Auf eventuell abweichende Lieferzeiten weisen wir auf der jeweiligen Produktseite hin.")}</motion.li>
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
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("CIRAT haftet für Sachmängel nach den hierfür geltenden gesetzlichen Vorschriften, insbesondere §§ 434 ff. Bürgerliches Gesetzbuch")}</motion.li>
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