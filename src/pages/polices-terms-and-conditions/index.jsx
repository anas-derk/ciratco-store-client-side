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
        <div className="privacy-policy-and-conditions caption-page page pt-5 overflow-auto">
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
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Information according to § 5 TMG")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Company name: CIRAT owner Amr Asfour")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("First name: Amr")} .</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Last name: Asfour")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Address: Neustadter Street 61, 68309 Mannheim, Germany")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Phone number: 4917682988660")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("E-mail: info@ciratco.com")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("VAT ID No. DE 356382264 (in accordance with § 27a of the German VAT Act)")}</motion.li>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Additional information: The EU Commission has created an online platform for the settlement of disputes. The platform serves as a point of contact for out-of-court settlement of disputes relating to contractual obligations arising from online sales contracts. More information is available at the following link: [http://ec.europa.eu/consumers/odr](http://ec.europa.eu/consumers/odr). We are neither willing nor obliged to participate in a dispute resolution procedure before a consumer arbitration board")}</motion.li>
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
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You bear the direct costs of returning the goods")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You are only liable for any loss in value of the goods if this loss in value is due to handling the goods beyond what is necessary to check their condition, characteristics, and functioning")}</motion.li>
                                    </ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("CIRAT provides information about the model withdrawal form according to the legal regulations as follows")} :</motion.li>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("model withdrawal form")}</motion.p>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(If you want to withdraw from the contract, please fill out this form and send it back)")}</motion.p>
                                    <ul>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("To CIRAT, Neustadter Str. 61, 68309 Mannheim, E-mail: info@ciratco.com")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Hereby I/we () withdraw from the contract concluded by me/us () for the purchase of the following goods ()/the provision of the following service ()")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Ordered on ()/received on ()")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Name of consumer(s)")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Address of consumer(s)")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Signature of consumer(s) (only if notified on paper)")}</motion.li>
                                        <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Date ____")}</motion.li>
                                    </ul>
                                    <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Signature of consumer(s) (only if notified on paper)")}</motion.p>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Prices and shipping costs")}</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The prices listed on the product pages include statutory VAT and other price components")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("In addition to the prices stated, we charge a flat rate of 0-10 euros per order for delivery within Germany. The shipping costs will be clearly communicated again on the product pages, in the shopping cart system, and on the order page")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("For payment by cash on delivery, an additional fee of 5 euros is due, which the delivery person collects on site. No further taxes or costs apply")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Delivery")}</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Delivery is made only within Germany with Deutsche Post, DHL, Hermes or DPD")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The delivery time is up to 3 days. We point out any deviating delivery times on the respective product page")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Payment")}</motion.li>
                                <ol>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Payment is made optionally by prepayment or cash on delivery")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you choose the prepayment payment method, we will provide our bank details in the order confirmation and deliver the goods after receipt of payment")}</motion.li>
                                </ol>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Retention of title")}</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Until full payment, the goods remain our property")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Warranty for material defects")}</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("CIRAT is liable for material defects according to the applicable legal provisions, especially §§ 434 ff. of the German Civil Code")}</motion.li>
                                </ul>
                                <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Dispute resolution")}</motion.li>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The EU Commission has established an internet platform for online dispute resolution")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The platform serves as a contact point for out-of-court settlement of disputes related to contractual obligations arising from online purchase contracts")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Further information is available at the following link: http://ec.europa.eu/consumers/odr(http://ec.europa.eu/consumers/odr)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("We are willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board according to § 36 VSBG (Consumer Dispute Resolution Act)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The competent consumer arbitration board is: Universal Arbitration Board of the Federal Centre for Arbitration e.V., Straßburger Straße 8, 77694 Kehl am Rhein, www.verbraucher-schlichter.de(http://www.verbraucher-schlichter.de)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("We will participate in dispute resolution proceedings before this board to settle the mentioned disputes")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Alternatively")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The EU Commission has established an internet platform for online dispute resolution")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The platform serves as a contact point for out-of-court settlement of disputes related to contractual obligations arising from online purchase contracts. Further information is available at the following link: http://ec.europa.eu/consumers/odr(http://ec.europa.eu/consumers/odr)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Right of withdrawal")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("(Please refer to the clauses in the terms and conditions)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you are a consumer (i.e., a natural person who places an order for a purpose that is neither predominantly commercial nor self-employed professional activity), you have a right of withdrawal according to the statutory provisions")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you as a consumer exercise your right of withdrawal according to clause 4.1, you bear the regular costs of return shipment")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Otherwise, the regulations applicable to the right of withdrawal are those set out in detail in the following withdrawal policy")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Right of withdrawal")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You have the right to withdraw from this contract within fourteen days without giving any reason")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The withdrawal period is fourteen days from the day on which you or a third party named by you, who is not the carrier, have taken possession of the goods")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("To exercise your right of withdrawal, you must inform us CIRAT, Neustadter Str. 61, 68309 Mannheim, Phone: +49 176 82988660, Email: ciratbusiness@gmail.com by means of a clear statement (e.g., a letter sent by post or an email) of your decision to withdraw from this contract")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You may use the attached model withdrawal form, but it is not obligatory")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You can also electronically fill in and submit the model withdrawal form or any other clear statement on our website (insert internet address)")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you use this option, we will promptly (e.g., by email) send you a confirmation of receipt of such withdrawal")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("To meet the withdrawal deadline, it is sufficient for you to send your communication exercising the right of withdrawal before the withdrawal period expires")}</motion.li>
                                </ul>
                                <motion.p className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("Consequences of withdrawal")}</motion.p>
                                <ul>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("If you withdraw from this contract, we shall reimburse all payments received from you, including delivery costs (except for the additional costs arising if you chose a delivery method other than the least expensive standard delivery offered by us), without undue delay and no later than fourteen days from the day we receive the notification of your withdrawal from this contract")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("For this reimbursement, we will use the same means of payment you used for the original transaction unless expressly agreed otherwise with you; in no case will you be charged fees for this reimbursement. We may withhold reimbursement until we have received the goods back or you have supplied evidence of having sent back the goods, whichever is the earlier")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("You must return or hand over the goods to us or to (here insert the name and address of the person authorized to receive the goods), without undue delay and in any event no later than fourteen days from the day on which you notify us of the withdrawal of this contract")}</motion.li>
                                    <motion.li className="mb-4" initial={getInitialStateForElementBeforeAnimation()} whileInView={getAnimationSettings}>{t("The deadline is met if you send the goods before the expiration of the fourteen-day period")}</motion.li>
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