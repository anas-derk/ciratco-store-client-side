import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft, FaCcPaypal, FaInstagram, FaTiktok, FaGooglePay } from "react-icons/fa";
import { LiaCcVisa } from "react-icons/lia";
import { FaCcMastercard } from "react-icons/fa";
import SepaLogo from "../../../public/images/Sepa.png";
import { IoLogoFacebook } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { getAnimationSettings, getInitialStateForElementBeforeAnimation, handleSelectUserLanguage } from "../../../public/global_functions/popular";
import { motion } from "motion/react";
import { SiAmericanexpress, SiApplepay } from "react-icons/si";

export default function Footer() {

    const [email, setEmail] = useState("");

    const [waitMsg, setWaitMsg] = useState("");

    const [errMsg, setErrorMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const { i18n, t } = useTranslation();

    const paymentMethods = [
        {
            name: "Paypal",
            icon: <FaCcPaypal className={`icon paypal-icon ${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
        },
        {
            name: "Visa Card",
            icon: <LiaCcVisa className={`icon visa-card-icon ${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
        },
        {
            name: "Master Card",
            icon: <FaCcMastercard className={`icon master-card-icon ${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
        },
        {
            name: "Google Pay Card",
            icon: <FaGooglePay className={`icon google-pay-card-icon ${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
        },
        {
            name: "Apple Pay Card",
            icon: <SiApplepay className={`icon apple-pay-card-icon ${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
        },
        {
            name: "American Express Card",
            icon: <SiAmericanexpress className={`icon apple-pay-card-icon ${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
        }
    ];

    useEffect(() => {
        const userLanguage = localStorage.getItem(process.env.USER_LANGUAGE_FIELD_NAME_IN_LOCAL_STORAGE);
        handleSelectUserLanguage(userLanguage === "ar" || userLanguage === "en" || userLanguage === "tr" || userLanguage === "de" ? userLanguage : "en", i18n.changeLanguage);
    }, []);

    const handleSubscription = async (e, email) => {
        try {
            e.preventDefault();
            setWaitMsg("Please Wait ...");
            const result = (await axios.post(`${process.env.BASE_API_URL}/subscriptions/add-new-subscription?language=${i18n.language}`, {
                email,
            })).data;
            setWaitMsg("");
            if (!result.error) {
                setSuccessMsg("Success Subscription !!");
                let errorTimeout = setTimeout(() => {
                    setSuccessMsg("");
                    clearTimeout(errorTimeout);
                }, 5000);
            } else {
                setErrorMsg(result.msg);
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errorTimeout);
                }, 5000);
            }
        }
        catch (err) {
            setWaitMsg(false);
            setErrorMsg(err?.message === "Network Error" ? "Network Error" : "Sorry, Something Went Wrong, Please Try Again !");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 5000);
        }
    }

    return (
        <footer className="pt-4 pb-4 custom-frame">
            <div className="container">
                <div className="row align-items-center mb-4">
                    <motion.div
                        className="col-xl-3"
                        initial={{
                            scale: 0.7,
                        }}
                        whileInView={{
                            scale: 1,
                            transition: {
                                duration: 0.4,
                            }
                        }}
                    >
                        <h5 className="fw-bold mb-4 border-bottom border-dark border-2 pb-2 title">{t("Our links").toUpperCase()}</h5>
                        <ul
                            className="links-list"
                        >
                            <li className="link-item fw-bold mb-3">
                                {i18n.language !== "ar" ? <FaLongArrowAltRight className="me-2" /> : <FaLongArrowAltLeft className="ms-2" />}
                                <Link href="/" className="text-dark link-btn">{t("Main").toUpperCase()}</Link>
                            </li>
                            <li className="link-item fw-bold mb-3">
                                {i18n.language !== "ar" ? <FaLongArrowAltRight className="me-2" /> : <FaLongArrowAltLeft className="ms-2" />}
                                <Link href="/auth" className="text-dark link-btn">{t("login").toUpperCase()}</Link>
                            </li>
                            <li className="link-item fw-bold mb-3">
                                {i18n.language !== "ar" ? <FaLongArrowAltRight className="me-2" /> : <FaLongArrowAltLeft className="ms-2" />}
                                <Link href="/about-us" className="text-dark link-btn">{t("About Us").toUpperCase()}</Link>
                            </li>
                            <li className="link-item fw-bold mb-3">
                                {i18n.language !== "ar" ? <FaLongArrowAltRight className="me-2" /> : <FaLongArrowAltLeft className="ms-2" />}
                                <Link href="/polices-terms-and-conditions" className="text-dark link-btn">{t("Polices-Terms & Conditions").toUpperCase()}</Link>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="col-xl-3"
                        initial={getInitialStateForElementBeforeAnimation()}
                        whileInView={getAnimationSettings}
                    >
                        <h5 className="fw-bold mb-4 border-bottom border-dark border-2 pb-2 title">{t("Contact Us").toUpperCase()}</h5>
                        <ul
                            className="links-list"
                        >
                            <li className="link-item fw-bold mb-3">
                                <IoLogoFacebook className={`${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
                                <Link href={process.env.FACEBOOK_LINK} target="_blank" className="text-dark link-btn">{t("Facebook").toUpperCase()}</Link>
                            </li>
                            <li className="link-item fw-bold mb-3">
                                <FaInstagram className={`${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
                                <Link href={process.env.INSTAGRAM_LINK} target="_blank" className="text-dark link-btn">{t("Instagram").toUpperCase()}</Link>
                            </li>
                            <li className="link-item fw-bold mb-3">
                                <FaTiktok className={`${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
                                <Link href={process.env.TIKTOK_LINK} target="_blank" className="text-dark link-btn">{t("Tiktok").toUpperCase()}</Link>
                            </li>
                            <li className="link-item fw-bold mb-3">
                                <MdEmail className={`${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
                                <Link href={`mailto:${process.env.CONTACT_EMAIL}`} className="text-dark link-btn">{t("Email").toUpperCase()}</Link>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="col-xl-3"
                        initial={{
                            scale: 0.7,
                        }}
                        whileInView={{
                            scale: 1,
                            transition: {
                                duration: 0.4,
                            }
                        }}
                    >
                        <h5 className="fw-bold mb-4 border-bottom border-dark border-2 pb-2 title">{t("Payment Methods").toUpperCase()}</h5>
                        <ul
                            className="payment-methods-list mb-5"
                        >
                            {paymentMethods.map((method) => (
                                <li className="payment-method-item fw-bold mb-3">
                                    {method.icon}
                                    <span>{t(method.name)}</span>
                                </li>
                            ))}
                            <li className="payment-method-item fw-bold mb-3">
                                <img src={SepaLogo.src} alt="Sepa Logo" className={`icon-as-image sepa-icon ${i18n.language !== "ar" ? "me-2" : "ms-2"}`} />
                                <span>{t("Sepa")}</span>
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="col-xl-3"
                        initial={{
                            scale: 0.7,
                        }}
                        whileInView={{
                            scale: 1,
                            transition: {
                                duration: 0.4,
                            }
                        }}
                    >
                        <h5 className="fw-bold mb-3 border-bottom border-dark border-2 pb-2 title">{t("Subscription").toUpperCase()}</h5>
                        <p className="mb-3">{t("Enter your email address")}</p>
                        <p className="mb-3">{"(" + t("I want to receive all the latest updates via email") + " )"}</p>
                        <form className="subscription-form" onSubmit={(e) => handleSubscription(e, email)}>
                            <input
                                type="email"
                                className="form-control p-2 d-block w-75 mb-3"
                                placeholder={t("Please Enter Email Here")}
                                onChange={(e) => setEmail(e.target.value.trim())}
                                required
                            />
                            {!waitMsg && !successMsg && !errMsg && <button type="submit" className="btn btn-info">{t("Subscription")}</button>}
                            {waitMsg && <button type="button" disabled className="btn btn-info">{waitMsg}</button>}
                            {successMsg && <button type="button" disabled className="btn btn-success">{successMsg}</button>}
                            {errMsg && <button type="button" disabled className="btn btn-danger">{errMsg}</button>}
                        </form>
                    </motion.div>
                </div>
                <p className="mb-0 text-center fw-bold">
                    {t("All Rights Reserved For")} <Link href="/" className="text-danger">{process.env.WEBSITE_NAME}</Link>
                </p>
            </div>
        </footer>
    );
}