import Head from "next/head";
import Header from "@/components/Header";
import Link from "next/link";
import { MdKeyboardArrowRight, MdOutlineMail } from "react-icons/md";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import LoaderPage from "@/components/LoaderPage";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { useTranslation } from "react-i18next";
import PaginationBar from "@/components/PaginationBar";
import { getCurrencyNameByCountry, getBaseCurrencyPriceAgainstCurrency } from "../../public/global_functions/prices";
import ShareOptionsBox from "@/components/ShareOptionsBox";
import ProductCard from "@/components/ProductCard";
import {
    getProductsCount,
    getAllProductsInsideThePage,
    isExistProductInsideTheCart,
    getStoreDetails,
    getCategoriesCount,
    getAllCategoriesInsideThePage,
    getStoresCount,
    getAllStoresInsideThePage,
    getFlashProductsCount,
    getAllFlashProductsInsideThePage,
    isExistOfferOnProduct,
    getFavoriteProductsByProductsIdsAndUserId,
    isFavoriteProductForUser,
    getUserInfo,
    getAppearedSections,
    handleSelectUserLanguage,
    getInitialStateForElementBeforeAnimation,
    getAnimationSettings,
    getAllBrandsInsideThePage
} from "../../public/global_functions/popular";
import { FaSearch } from "react-icons/fa";
import NotFoundError from "@/components/NotFoundError";
import StoreCard from "@/components/StoreCard";
import SectionLoader from "@/components/SectionLoader";
import NavigateToUpOrDown from "@/components/NavigateToUpOrDown";
import BrandCard from "@/components/BrandCard";
import ErrorPopup from "@/components/ErrorPopup";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";
import { motion } from "motion/react";

export default function Home({ countryAsProperty, storeId }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [errorMsgOnLoadingThePage, setErrorMsgOnLoadingThePage] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [isDisplayErrorPopup, setIsDisplayErrorPopup] = useState(false);

    const [errorType, setErrorType] = useState("");

    const [convertedPrice, setConvertedPrice] = useState(1);

    const [currencyNameByCountry, setCurrencyNameByCountry] = useState("");

    const [storeDetails, setStoreDetails] = useState({});

    const [isGetStoreDetails, setIsGetStoreDetails] = useState(true);

    const [isGetCategories, setIsGetCategories] = useState(true);

    const [isGetProducts, setIsGetProducts] = useState(true);

    const [isGetFlashProducts, setIsGetFlashProducts] = useState(true);

    const [windowInnerWidth, setWindowInnerWidth] = useState(0);

    const [isGetBrands, setIsGetBrands] = useState(true);

    const [isGetStores, setIsGetStores] = useState(true);

    const [allTextAds, setAllTextAds] = useState([]);

    const [allImageAds, setAllImageAds] = useState([]);

    const [allCategoriesInsideThePage, setAllCategoriesInsideThePage] = useState([]);

    const [favoriteProductsListForUserByProductsIdsAndUserId, setFavoriteProductsListForUserByProductsIdsAndUserId] = useState([]);

    const [allFlashProductsInsideThePage, setAllFlashProductsInsideThePage] = useState([]);

    const [isExistFlashProductsInDBInGeneral, setIsExistFlashProductsInDBInGeneral] = useState(false);

    const [allProductsInsideThePage, setAllProductsInsideThePage] = useState([]);

    const [isExistProductsInDBInGeneral, setIsExistProductsInDBInGeneral] = useState(false);

    const [currentDate, setCurrentDate] = useState("");

    const [allStoresInsideThePage, setAllStoresInsideThePage] = useState([]);

    const [currentPage, setCurrentPage] = useState({
        forCategories: 1,
        forFlashProducts: 1,
        forProducts: 1,
        forStores: 1,
    });

    const [totalPagesCount, setTotalPagesCount] = useState({
        forCategories: 0,
        forFlashProducts: 0,
        forProducts: 0,
        forStores: 0,
    });

    const [filters, setFilters] = useState({
        forFlashProducts: {
            name: "",
            offerDescription: "",
        },
        forProducts: {
            name: "",
        },
        forCategories: {
            name: "",
        },
        forStores: {
            name: "",
        },
        storeId: "",
        status: "approving",
        parent: null,
    });

    const [sortDetails, setSortDetails] = useState({
        forFlashProducts: {
            by: "",
            type: 1,
        },
        forProducts: {
            by: "",
            type: 1,
        },
    });

    const [isDisplayShareOptionsBox, setIsDisplayShareOptionsBox] = useState(false);

    const [sharingName, setSharingName] = useState("");

    const [sharingURL, setSharingURL] = useState("");

    const [appearedSections, setAppearedSections] = useState([]);

    const [allBrandsInsideThePage, setAllBrandsInsideThePage] = useState([]);

    const [isDisplayContactIcons, setIsDisplayContactIcons] = useState(false);

    const { i18n, t } = useTranslation();

    const pageSizes = {
        forCategories: 16,
        forFlashProducts: 9,
        forProducts: 9,
        forStores: 9,
    };

    useEffect(() => {
        const userLanguage = localStorage.getItem(process.env.USER_LANGUAGE_FIELD_NAME_IN_LOCAL_STORAGE);
        handleSelectUserLanguage(userLanguage === "ar" || userLanguage === "en" || userLanguage === "tr" || userLanguage === "de" ? userLanguage : "en", i18n.changeLanguage);
    }, []);

    useEffect(() => {
        setIsLoadingPage(true);
        const selectedCountry = localStorage.getItem(process.env.SELECTED_COUNTRY_BY_USER) ?? countryAsProperty;
        getBaseCurrencyPriceAgainstCurrency(selectedCountry).then((price) => {
            setConvertedPrice(price);
            setCurrencyNameByCountry(getCurrencyNameByCountry(selectedCountry));
            if (!isGetStoreDetails) {
                setIsLoadingPage(false);
            }
        })
            .catch((err) => {
                setIsLoadingPage(false);
                setErrorMsgOnLoadingThePage(err?.message === "Network Error" ? "Network Error" : "Sorry, Something Went Wrong, Please Try Again !");
            });
    }, [countryAsProperty]);

    useEffect(() => {
        const userToken = localStorage.getItem(process.env.USER_TOKEN_NAME_IN_LOCAL_STORAGE);
        if (userToken) {
            getUserInfo()
                .then((result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.USER_TOKEN_NAME_IN_LOCAL_STORAGE);
                    }
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        localStorage.removeItem(process.env.USER_TOKEN_NAME_IN_LOCAL_STORAGE);
                    }
                    else {
                        setIsLoadingPage(false);
                        setErrorMsgOnLoadingThePage(err?.message === "Network Error" ? "Network Error" : "Sorry, Something Went Wrong, Please Try Again !");
                    }
                });
        }
    }, []);

    useEffect(() => {
        setIsLoadingPage(true);
        handleResetAllHomeData();
        handleIsGetAllHomeData();
        // ==========================================================================================
        getStoreDetails(storeId)
            .then(async (storeDetailsResult) => {
                setIsGetStoreDetails(false);
                if (!storeDetailsResult.error && storeDetailsResult.data?.status === "approving") {
                    setStoreDetails(storeDetailsResult.data);
                    const tempFilters = { ...filters, storeId: storeDetailsResult.data._id };
                    setFilters(tempFilters);
                    const filtersAsString = getFiltersAsQuery(tempFilters);
                    if (storeDetailsResult.data.isMainStore) {
                        let allTextAdsTemp = [], allImageAdsTemp = [];
                        (await getAllAds(filtersAsString)).data.forEach((ad) => {
                            if (ad.type === "text") allTextAdsTemp.push(ad);
                            else allImageAdsTemp.push(ad);
                        });
                        setAllTextAds(allTextAdsTemp);
                        setAllImageAds(allImageAdsTemp);
                    }
                    // =============================================================================
                    let totalPagesCountTemp = {
                        forCategories: 0,
                        forFlashProducts: 0,
                        forProducts: 0,
                        forStores: 0,
                    }
                    const result = (await getAllCategoriesInsideThePage(1, pageSizes.forCategories, filtersAsString)).data;
                    setAllCategoriesInsideThePage(result.categories);
                    totalPagesCountTemp.forCategories = Math.ceil(result.categoriesCount / pageSizes.forCategories);
                    setTotalPagesCount(totalPagesCountTemp);
                    setIsGetCategories(false);
                    // =============================================================================
                    const { flashProductsCount, flashProductsData, currentDateTemp } = await handleGetFlashProducts(filtersAsString);
                    setCurrentDate(currentDateTemp);
                    setAllFlashProductsInsideThePage(flashProductsData);
                    totalPagesCountTemp.forFlashProducts = Math.ceil(flashProductsCount / pageSizes.forFlashProducts);
                    setTotalPagesCount(totalPagesCountTemp);
                    if (flashProductsData.length > 0) {
                        setIsExistFlashProductsInDBInGeneral(true);
                    }
                    setIsGetFlashProducts(false);
                    // =============================================================================
                    const { productsCount, productsData } = await handleGetProducts(filtersAsString);
                    setAllProductsInsideThePage(productsData);
                    totalPagesCountTemp.forProducts = Math.ceil(productsCount / pageSizes.forProducts);
                    setTotalPagesCount(totalPagesCountTemp);
                    if (productsData.length > 0) {
                        setIsExistProductsInDBInGeneral(true);
                    }
                    // =============================================================================
                    await handleGetAndSetFavoriteProductsByProductsIdsAndUserId(
                        handleCreateProductsIdsToGetFavoriteProductsForUser(
                            flashProductsData.map((flashProduct) => flashProduct._id),
                            productsData.map((product) => product._id)
                        )
                    );
                    setIsGetProducts(false);
                    // =============================================================================
                    const appearedSectionsResult = await getAppearedSections();
                    const appearedSectionsLength = appearedSectionsResult.data.length;
                    setAppearedSections(appearedSectionsLength > 0 ? appearedSectionsResult.data.map((appearedSection) => appearedSection.isAppeared ? appearedSection.sectionName : "") : []);
                    if (appearedSectionsLength > 0) {
                        for (let i = 0; i < appearedSectionsLength; i++) {
                            if (appearedSectionsResult.data[i].sectionName === "brands" && appearedSectionsResult.data[i].isAppeared) {
                                setAllBrandsInsideThePage((await getAllBrandsInsideThePage(1, 9, filtersAsString)).data.brands);
                                setIsGetBrands(false);
                            }
                            if (appearedSectionsResult.data[i].sectionName === "stores" && appearedSectionsResult.data[i].isAppeared) {
                                const { storesCount, storesData } = await handleGetStores(filtersAsString);
                                totalPagesCountTemp.forStores = Math.ceil(storesCount / pageSizes.forStores);
                                setAllStoresInsideThePage(storesData);
                                setIsGetStores(false);
                            }
                        }
                    }
                    setTotalPagesCount(totalPagesCountTemp);
                }
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
        // =============================================================================
    }, [storeId]);

    useEffect(() => {
        if (!isGetStoreDetails) {
            setIsLoadingPage(false);
        }
    }, [isGetStoreDetails]);

    useEffect(() => {
        setWindowInnerWidth(window.innerWidth);
        window.addEventListener("resize", function () {
            setWindowInnerWidth(this.innerWidth);
        });
    }, []);

    const handleResetAllHomeData = () => {
        setAllTextAds([]);
        setAllImageAds([]);
        setAllCategoriesInsideThePage([]);
        setAllFlashProductsInsideThePage([]);
        setAllProductsInsideThePage([]);
        setAllBrandsInsideThePage([]);
        setAllStoresInsideThePage([]);
        setTotalPagesCount({
            forCategories: 0,
            forProducts: 0,
            forStores: 0,
        });
        setCurrentPage({
            forCategories: 1,
            forFlashProducts: 1,
            forProducts: 1,
            forStores: 1
        });
    }

    const handleIsGetAllHomeData = () => {
        setIsGetStoreDetails(true);
        setIsGetCategories(true);
        setIsGetProducts(true);
        setIsGetFlashProducts(true);
        setIsGetBrands(true);
        setIsGetStores(true);
    }

    const getAllAds = async () => {
        try {
            return (await axios.get(`${process.env.BASE_API_URL}/ads/all-ads?language=${i18n.language}`)).data;
        }
        catch (err) {
            throw err;
        }
    }

    const getAppearedSlidesCount = (windowInnerWidth, count) => {
        if (windowInnerWidth < 767) return 1;
        if (windowInnerWidth >= 767 && windowInnerWidth < 1199 && count >= 2) return 2;
        if (windowInnerWidth >= 1199 && count >= 3) return 3;
        return count;
    }

    const handleGetCategories = async (filtersAsString) => {
        try {
            const result = (await getAllCategoriesInsideThePage(1, pageSizes.forCategories, filtersAsString)).data;
            return {
                categoriesData: result.categories,
                categoriesCount: result.categoriesCount,
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleGetFlashProducts = async (filtersAsString, sortDetailsAsString) => {
        try {
            const result = (await getAllFlashProductsInsideThePage(1, pageSizes.forFlashProducts, filtersAsString, sortDetailsAsString)).data;
            return {
                flashProductsData: result.products,
                flashProductsCount: result.productsCount,
                currentDateTemp: result.currentDate
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleGetProducts = async (filtersAsString, sortDetailsAsString) => {
        try {
            const result = (await getAllProductsInsideThePage(1, pageSizes.forProducts, filtersAsString, sortDetailsAsString)).data;
            return {
                productsData: result.products,
                productsCount: result.productsCount,
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleCreateProductsIdsToGetFavoriteProductsForUser = (flashProductsIds, productsIds) => {
        return Array.from(new Set(flashProductsIds.concat(productsIds)));
    }

    const handleGetAndSetFavoriteProductsByProductsIdsAndUserId = async (productsIds) => {
        try {
            const userToken = localStorage.getItem(process.env.USER_TOKEN_NAME_IN_LOCAL_STORAGE);
            if (userToken) {
                setFavoriteProductsListForUserByProductsIdsAndUserId((await getFavoriteProductsByProductsIdsAndUserId(productsIds)).data);
            }
        }
        catch (err) {
            throw err;
        }
    }

    const handleGetStores = async (filtersAsString) => {
        try {
            const result = (await getAllStoresInsideThePage(1, pageSizes.forStores, filtersAsString)).data;
            return {
                storesData: result.stores,
                storesCount: result.storesCount,
            }
        }
        catch (err) {
            throw err;
        }
    }

    const getFiltersAsQuery = (filters) => {
        let filtersAsQuery = "";
        if (filters.parent || filters.parent === null) filtersAsQuery = `parent=${filters.parent}&`;
        if (filters.name) filtersAsQuery += `name=${filters.name}&`;
        if (filters.offerDescription) filtersAsQuery += `offerDescription=${filters.offerDescription}&`;
        if (filters.storeId) filtersAsQuery += `storeId=${filters.storeId}&`;
        if (filters.status) filtersAsQuery += `status=${filters.status}&`;
        if (filtersAsQuery) filtersAsQuery = filtersAsQuery.substring(0, filtersAsQuery.length - 1);
        return filtersAsQuery;
    }

    const getSortDetailsAsQuery = (sortDetails) => {
        let sortDetailsAsQuery = "";
        if (sortDetails.by && sortDetails.type) sortDetailsAsQuery += `sortBy=${sortDetails.by}&sortType=${sortDetails.type}`;
        return sortDetailsAsQuery;
    }

    const getPreviousPage = async (section) => {
        try {
            if (section === "categories") {
                setIsGetCategories(true);
                const newCurrentPage = currentPage.forCategories - 1;
                setAllCategoriesInsideThePage((await getAllCategoriesInsideThePage(newCurrentPage, pageSizes.forCategories)).data.categories);
                setCurrentPage({ ...currentPage, forCategories: newCurrentPage });
                setIsGetCategories(false);
            }
            else if (section === "products") {
                setIsGetProducts(true);
                const newCurrentPage = currentPage.forProducts - 1;
                setAllProductsInsideThePage((await getAllProductsInsideThePage(newCurrentPage, pageSizes.forProducts, getFiltersAsQuery(filters), getSortDetailsAsQuery(sortDetails))).data.products);
                setCurrentPage({ ...currentPage, forProducts: newCurrentPage });
                setIsGetProducts(false);
            }
            else {
                setIsGetStores(true);
                const newCurrentPage = currentPage.forStores - 1;
                setAllStoresInsideThePage((await getAllStoresInsideThePage(newCurrentPage, pageSizes.forStores, getFiltersAsQuery(filters))).data.stores);
                setCurrentPage({ ...currentPage, forStores: newCurrentPage });
                setIsGetStores(false);
            }
        }
        catch (err) {
            setErrorMsg(err?.message === "Network Error" ? "Network Error When Get Data" : "Sorry, Someting Went Wrong When Get Data, Please Repeate The Process !!");
        }
    }

    const getNextPage = async (section) => {
        try {
            if (section === "categories") {
                setIsGetCategories(true);
                const newCurrentPage = currentPage.forCategories + 1;
                setAllCategoriesInsideThePage((await getAllCategoriesInsideThePage(newCurrentPage, pageSizes.forCategories)).data.categories);
                setCurrentPage({ ...currentPage, forCategories: newCurrentPage });
                setIsGetCategories(false);
            }
            else if (section === "products") {
                setIsGetProducts(true);
                const newCurrentPage = currentPage.forProducts + 1;
                setAllProductsInsideThePage((await getAllProductsInsideThePage(newCurrentPage, pageSizes.forProducts, getFiltersAsQuery(filters), getSortDetailsAsQuery(sortDetails))).data.products);
                setCurrentPage({ ...currentPage, forProducts: newCurrentPage });
                setIsGetProducts(false);
            }
            else {
                setIsGetStores(true);
                const newCurrentPage = currentPage.forStores + 1;
                setAllStoresInsideThePage((await getAllStoresInsideThePage(newCurrentPage, pageSizes.forStores, getFiltersAsQuery(filters))).data.stores);
                setCurrentPage({ ...currentPage, forStores: newCurrentPage });
                setIsGetStores(false);
            }
        }
        catch (err) {
            setErrorMsg(err?.message === "Network Error" ? "Network Error When Get Data" : "Sorry, Someting Went Wrong When Get Data, Please Repeate The Process !!");
        }
    }

    const getSpecificPage = async (pageNumber, section) => {
        try {
            if (section === "categories") {
                setIsGetCategories(true);
                setAllCategoriesInsideThePage((await getAllCategoriesInsideThePage(pageNumber, pageSizes.forCategories)).data.categories);
                setCurrentPage({ ...currentPage, forCategories: pageNumber });
                setIsGetCategories(false);
            }
            else if (section === "products") {
                setIsGetProducts(true);
                setAllProductsInsideThePage((await getAllProductsInsideThePage(pageNumber, pageSizes.forProducts, getFiltersAsQuery(filters), getSortDetailsAsQuery(sortDetails))).data.products);
                setCurrentPage({ ...currentPage, forProducts: pageNumber });
                setIsGetProducts(false);
            }
            else {
                setIsGetStores(true);
                setAllStoresInsideThePage((await getAllStoresInsideThePage(pageNumber, pageSizes.forStores, getFiltersAsQuery(filters))).data.stores);
                setCurrentPage({ ...currentPage, forStores: pageNumber });
                setIsGetStores(false);
            }
        }
        catch (err) {
            setErrorMsg(err?.message === "Network Error" ? "Network Error When Get Data" : "Sorry, Someting Went Wrong When Get Data, Please Repeate The Process !!");
        }
    }

    const handleChangeFilters = async (e, section) => {
        e.preventDefault();
        if (section === "categories") {
            const tempFilters = {
                ...filters,
                forCategories: {
                    ...filters.forCategories,
                    name: e.target.value.trim(),
                },
            };
            setFilters(tempFilters);
            await searchOnCategory(e, { ...tempFilters.forCategories, storeId: filters.storeId });
        } else if (section === "flash-products") {
            const tempFilters = {
                ...filters,
                forFlashProducts: {
                    ...filters.forFlashProducts,
                    name: e.target.value.trim(),
                }
            };
            setFilters(tempFilters);
            await searchOnProduct(e, "flash", tempFilters.forFlashProducts, sortDetails.forFlashProducts);
        } else if (section === "products") {
            const tempFilters = {
                ...filters,
                forProducts: {
                    ...filters.forProducts,
                    name: e.target.value.trim(),
                }
            };
            setFilters(tempFilters);
            await searchOnProduct(e, "normal", tempFilters.forProducts, sortDetails.forProducts);
        } else {
            const tempFilters = {
                ...filters,
                forStores: {
                    ...filters.forStores,
                    name: e.target.value.trim(),
                }
            };
            setFilters(tempFilters);
            await searchOnStore(e, { ...tempFilters.forStores, status: "approving" });
        }
    }

    const handleChangeSorts = (e, section) => {
        e.preventDefault();
        if (section === "flash-products") {
            const sortDetailsArray = e.target.value.split(",");
            const tempSortDetails = {
                ...sortDetails,
                forFlashProducts: { by: sortDetailsArray[0], type: sortDetailsArray[1] }
            };
            setSortDetails(tempSortDetails);
            searchOnProduct(e, "flash", filters.forFlashProducts, tempSortDetails.forFlashProducts);
        } else {
            const sortDetailsArray = e.target.value.split(",");
            const tempSortDetails = {
                ...sortDetails,
                forProducts: { by: sortDetailsArray[0], type: sortDetailsArray[1] }
            };
            setSortDetails(tempSortDetails);
            searchOnProduct(e, "normal", filters.forProducts, tempSortDetails.forProducts);
        }
    }

    const searchOnProduct = async (e, productType, filters, sortDetails) => {
        try {
            e.preventDefault();
            if (productType === "normal") {
                setIsGetProducts(true);
                setCurrentPage({ ...currentPage, forProducts: 1 });
                const { productsCount, productsData } = await handleGetProducts(getFiltersAsQuery(filters), getSortDetailsAsQuery(sortDetails));
                setTotalPagesCount({
                    ...totalPagesCount,
                    forProducts: Math.ceil(productsCount / pageSizes.forProducts)
                });
                setAllProductsInsideThePage(productsData);
                await handleGetAndSetFavoriteProductsByProductsIdsAndUserId(
                    handleCreateProductsIdsToGetFavoriteProductsForUser(
                        allFlashProductsInsideThePage.map((flashProduct) => flashProduct._id),
                        productsData.map((product) => product._id)
                    )
                );
                setIsGetProducts(false);
            } else {
                setIsGetFlashProducts(true);
                const { flashProductsCount, flashProductsData, currentDateTemp } = await handleGetFlashProducts(getFiltersAsQuery(filters), getSortDetailsAsQuery(sortDetails));
                setCurrentDate(currentDateTemp);
                setTotalPagesCount({
                    ...totalPagesCount,
                    forFlashProducts: Math.ceil(flashProductsCount / pageSizes.forProducts)
                });
                setAllFlashProductsInsideThePage(flashProductsData);
                await handleGetAndSetFavoriteProductsByProductsIdsAndUserId(
                    handleCreateProductsIdsToGetFavoriteProductsForUser(
                        flashProductsData.map((flashProduct) => flashProduct._id),
                        allProductsInsideThePage.map((product) => product._id)
                    )
                );
                setIsGetFlashProducts(false);
            }
        }
        catch (err) {
            setIsGetFlashProducts(false);
            setIsGetProducts(false);
            setErrorMsg(err?.message === "Network Error" ? "Network Error" : "Sorry, Someting Went Wrong, Please Repeate The Process !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 1500);
        }
    }

    const searchOnCategory = async (e, filters) => {
        try {
            e.preventDefault();
            setIsGetCategories(true);
            setCurrentPage({ ...currentPage, forCategories: 1 });
            const { categoriesCount, categoriesData } = await handleGetCategories(getFiltersAsQuery(filters));
            setTotalPagesCount({
                ...totalPagesCount,
                forCategories: Math.ceil(categoriesCount / pageSizes.forCategories)
            });
            setAllCategoriesInsideThePage(categoriesData);
            setIsGetCategories(false);
        }
        catch (err) {
            setIsGetCategories(false);
            setErrorMsg(err?.message === "Network Error" ? "Network Error" : "Sorry, Someting Went Wrong, Please Repeate The Process !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 1500);
        }
    }

    const searchOnStore = async (e, filters) => {
        try {
            e.preventDefault();
            setIsGetStores(true);
            setCurrentPage({ ...currentPage, forStores: 1 });
            const { storesCount, storesData } = await handleGetStores(getFiltersAsQuery(filters));
            setTotalPagesCount({
                ...totalPagesCount,
                forStores: Math.ceil(storesCount / pageSizes.forStores)
            });
            setAllStoresInsideThePage(storesData);
            setIsGetStores(false);
        }
        catch (err) {
            setIsGetStores(false);
            setErrorMsg(err?.message === "Network Error" ? "Network Error" : "Sorry, Someting Went Wrong, Please Repeate The Process !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 1500);
        }
    }

    return (
        <div className="home page">
            <Head>
                <title>{t(process.env.STORE_NAME)} - {t("Home")}</title>
            </Head>
            {!isLoadingPage && !errorMsgOnLoadingThePage && <>
                <Header />
                {/* Start Share Options Box */}
                {isDisplayShareOptionsBox && <ShareOptionsBox
                    setIsDisplayShareOptionsBox={setIsDisplayShareOptionsBox}
                    sharingName={sharingName}
                    sharingURL={sharingURL}
                />}
                {isDisplayErrorPopup && <ErrorPopup
                    setIsDisplayErrorPopup={setIsDisplayErrorPopup}
                    errorType={errorType}
                />}
                <NavigateToUpOrDown />
                {/* End Share Options Box */}
                <div className={`page-content ${allTextAds.length === 0 && "pt-5"}`}>
                    {/* Start Text Ads Section */}
                    {allTextAds.length > 0 && <motion.section
                        className="text-ads text-center p-3 bg-white fw-bold mb-5 custom-frame"
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: "100%",
                            transition: {
                                duration: 0.3,
                            }
                        }}
                    >
                        <Carousel indicators={false} controls={false}>
                            {allTextAds.map((ad, index) => (
                                <Carousel.Item key={index}>
                                    <Carousel.Caption>
                                        <p className="ad-content text-dark m-0">{ad.content[i18n.language]}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </motion.section>}
                    {/* End Text Ads Section */}
                    <div className="container-fluid">
                        {Object.keys(storeDetails).length > 0 ? <>
                            {/* Start Store Details Section */}
                            {!storeDetails.isMainStore && <section className="store-details text-white text-center mb-5">
                                <img
                                    src={`${process.env.BASE_API_URL}/${storeDetails.imagePath}`}
                                    alt={`${storeDetails.name} Store Image`}
                                    width="200"
                                    height="200"
                                    className="d-block mx-auto mb-5 store-image"
                                />
                                <h1 className="mb-5 border-bottom border-4 pb-3 welcome-msg mb-5 mw-100 mx-auto h3">{t("Welcome To You In Store")} {storeDetails.name}</h1>
                                <h2 className="products-description mb-4 h4">{storeDetails.productsDescription}</h2>
                            </section>}
                            {/* End Store Details Section */}
                            {/* Start Image Ads Section */}
                            {allImageAds.length > 0 && <section className="image-ads mb-5 pb-3">
                                <div className="container-fluid">
                                    <Slider
                                        dots={true}
                                        arrows={false}
                                        infinite={true}
                                        speed={500}
                                        slidesToShow={getAppearedSlidesCount(windowInnerWidth, allImageAds.length)}
                                        slidesToScroll={getAppearedSlidesCount(windowInnerWidth, allImageAds.length)}
                                        autoplay={true}
                                    >
                                        {allImageAds.map((ad) => (
                                            <motion.div
                                                className="ad-box mb-4"
                                                key={ad._id}
                                                initial={getInitialStateForElementBeforeAnimation()}
                                                whileInView={getAnimationSettings}
                                                whileHover={{
                                                    scale: 1.1
                                                }}
                                            >
                                                <div className="ad-image-box mb-4">
                                                    <Link href={`/product-details/${ad.product}`}>
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${ad.imagePath}`}
                                                            alt="Ad Image"
                                                            onDragStart={(e) => e.preventDefault()}
                                                        />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </Slider>
                                </div>
                            </section>}
                            {/* End Image Ads Section */}
                            {/* Start Categories Section */}
                            <section
                                className="categories mb-5 pb-5" id="categories"
                            >
                                <h2 className="section-name text-center mb-4 text-white h4">{t("Categories")}</h2>
                                <div className="row filters-box mb-4">
                                    <div className="col-12">
                                        <motion.form
                                            className="search-form"
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                        >
                                            <div className="category-name-field-box searched-field-box">
                                                <input
                                                    type="text"
                                                    placeholder={t("Please Enter The Name Of The Category You Want To Search For")}
                                                    className="form-control"
                                                    onChange={(e) => handleChangeFilters(e, "categories")}
                                                />
                                                <div className={`icon-box ${i18n.language === "ar" ? "ar-language-mode" : "other-languages-mode"}`}>
                                                    <FaSearch className='icon' onClick={(e) => searchOnCategory(e, filters.forCategories)} />
                                                </div>
                                            </div>
                                        </motion.form>
                                    </div>
                                </div>
                                {isGetCategories && <SectionLoader />}
                                {!isGetCategories && allCategoriesInsideThePage.length > 0 && <div className="row mb-5">
                                    {allCategoriesInsideThePage.map((category) => (
                                        <motion.div
                                            className="col-md-3"
                                            key={category._id}
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                        >
                                            <div className="category-details p-3">
                                                <Link href={`/products-by-category?categoryId=${category._id}`} className="product-by-category-link text-dark">
                                                    <h6 className="cateogory-name mb-3">{category.name[i18n.language]}</h6>
                                                    <MdKeyboardArrowRight className="forward-arrow-icon" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>}
                                {!isGetCategories && allCategoriesInsideThePage.length === 0 && <NotFoundError errorMsg={t("Sorry, Can't Find Any Categories For This Store !!")} />}
                                {totalPagesCount.forCategories > 1 &&
                                    <PaginationBar
                                        totalPagesCount={totalPagesCount.forCategories}
                                        currentPage={currentPage.forCategories}
                                        getPreviousPage={getPreviousPage}
                                        getNextPage={getNextPage}
                                        getSpecificPage={getSpecificPage}
                                        paginationButtonTextColor={"#FFF"}
                                        paginationButtonBackgroundColor={"transparent"}
                                        activePaginationButtonColor={"#000"}
                                        activePaginationButtonBackgroundColor={"#FFF"}
                                        isDisplayCurrentPageNumberAndCountOfPages={false}
                                        isDisplayNavigateToSpecificPageForm={false}
                                        section="categories"
                                    />
                                }
                            </section>
                            {/* End Categories Section */}
                            {/* Start Last Added Flash Products */}
                            <section className="last-added-flash-products mb-5 pb-3" id="latest-added-flash-products">
                                <h2 className="section-name text-center mb-4 text-white h4">{t("Flash Products")}</h2>
                                {isExistFlashProductsInDBInGeneral && <div className="row filters-and-sorting-box mb-4">
                                    <div
                                        className="col-xs-12 col-md-6"
                                    >
                                        <motion.form
                                            className="search-form"
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                        >
                                            <div className="product-name-field-box searched-field-box">
                                                <input
                                                    type="text"
                                                    placeholder={t("Please Enter The name Of The Product You Want To Search For")}
                                                    className="form-control"
                                                    onChange={(e) => handleChangeFilters(e, "flash-products")}
                                                />
                                                <div className={`icon-box ${i18n.language === "ar" ? "ar-language-mode" : "other-languages-mode"}`}>
                                                    <FaSearch className="icon" onClick={(e) => searchOnProduct(e, "flash", filters.forFlashProducts, sortDetails.forFlashProducts)} />
                                                </div>
                                            </div>
                                        </motion.form>
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <motion.form
                                            className="sort-form"
                                            onSubmit={(e) => searchOnProduct(e, "flash", filters.forFlashProducts, sortDetails.forFlashProducts)}
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                        >
                                            <div className="select-sort-type-box">
                                                <select
                                                    className="select-sort-type form-select"
                                                    onChange={(e) => handleChangeSorts(e, "flash-products")}
                                                >
                                                    <option value="" hidden>{t("Sort By")}</option>
                                                    <option value="postOfDate,1">{t("From Latest To Oldest")}</option>
                                                    <option value="postOfDate,-1">{t("From Oldest To Latest")}</option>
                                                    <option value="price,-1">{t("From Highest Price To Lowest")}</option>
                                                    <option value="price,1">{t("From Lowest Price To Highest")}</option>
                                                </select>
                                            </div>
                                        </motion.form>
                                    </div>
                                </div>}
                                {isGetFlashProducts && <SectionLoader />}
                                <div className="row products-box section-data-box pt-4 pb-4">
                                    {!isGetFlashProducts && allFlashProductsInsideThePage.length > 0 && allFlashProductsInsideThePage.map((product) => (
                                        <motion.div
                                            className="col-xs-12 col-lg-6 col-xl-4"
                                            key={product._id}
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                        >
                                            <ProductCard
                                                productDetails={product}
                                                setIsDisplayShareOptionsBox={setIsDisplayShareOptionsBox}
                                                convertedPrice={convertedPrice}
                                                currencyNameByCountry={currencyNameByCountry}
                                                isFavoriteProductForUserAsProperty={isFavoriteProductForUser(favoriteProductsListForUserByProductsIdsAndUserId, product._id)}
                                                isExistProductInsideTheCartAsProperty={isExistProductInsideTheCart(product._id)}
                                                setSharingName={setSharingName}
                                                setSharingURL={setSharingURL}
                                                currentDateAsString={currentDate}
                                                isFlashProductAsProperty={true}
                                                isDisplayCountdown={true}
                                                setIsDisplayErrorPopup={setIsDisplayErrorPopup}
                                                setErrorType={setErrorType}
                                            />
                                        </motion.div>
                                    ))}
                                    {!isGetFlashProducts && allFlashProductsInsideThePage.length === 0 && <NotFoundError errorMsg={t(!isExistFlashProductsInDBInGeneral ? "Sorry, Not Found Any Products Now !!" : "Sorry, Not Found Any Products Related In This Name !!")} />}
                                    {totalPagesCount.forFlashProducts > 1 &&
                                        <PaginationBar
                                            totalPagesCount={totalPagesCount.forFlashProducts}
                                            currentPage={currentPage.forFlashProducts}
                                            getPreviousPage={getPreviousPage}
                                            getNextPage={getNextPage}
                                            getSpecificPage={getSpecificPage}
                                            paginationButtonTextColor={"#FFF"}
                                            paginationButtonBackgroundColor={"transparent"}
                                            activePaginationButtonColor={"#000"}
                                            activePaginationButtonBackgroundColor={"#FFF"}
                                            section="flash-products"
                                        />}
                                </div>
                            </section>
                            {/* End Last Added Flash Products */}
                            {/* Start Last Added Products */}
                            <section className="last-added-products mb-5 pb-3" id="latest-added-products">
                                <h2 className="section-name text-center mb-4 text-white h4">{t("Last Added Products")}</h2>
                                {isExistProductsInDBInGeneral && <div className="row filters-and-sorting-box mb-4">
                                    <div className="col-xs-12 col-md-6">
                                        <motion.form
                                            className="search-form"
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                        >
                                            <div className="product-name-field-box searched-field-box">
                                                <input
                                                    type="text"
                                                    placeholder={t("Please Enter The name Of The Product You Want To Search For")}
                                                    className="form-control"
                                                    onChange={(e) => handleChangeFilters(e, "products")}
                                                />
                                                <div className={`icon-box ${i18n.language === "ar" ? "ar-language-mode" : "other-languages-mode"}`}>
                                                    <FaSearch className='icon' onClick={(e) => searchOnProduct(e, "normal", filters.forProducts, sortDetails.forProducts)} />
                                                </div>
                                            </div>
                                        </motion.form>
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <motion.form
                                            className="sort-form"
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                        >
                                            <div className="select-sort-type-box">
                                                <select
                                                    className="select-sort-type form-select"
                                                    onChange={(e) => handleChangeSorts(e, "products")}
                                                >
                                                    <option value="" hidden>{t("Sort By")}</option>
                                                    <option value="postOfDate,1">{t("From Latest To Oldest")}</option>
                                                    <option value="postOfDate,-1">{t("From Oldest To Latest")}</option>
                                                    <option value="price,-1">{t("From Highest Price To Lowest")}</option>
                                                    <option value="price,1">{t("From Lowest Price To Highest")}</option>
                                                </select>
                                            </div>
                                        </motion.form>
                                    </div>
                                </div>}
                                {isGetProducts && <SectionLoader />}
                                {!isGetProducts && allProductsInsideThePage.length === 0 && <NotFoundError errorMsg={t(!isExistProductsInDBInGeneral ? "Sorry, Not Found Any Products Now !!" : "Sorry, Not Found Any Products Related In This Name !!")} />}
                                <div className="row products-box section-data-box pt-4 pb-4">
                                    {!isGetProducts && allProductsInsideThePage.length > 0 && allProductsInsideThePage.map((product) => (
                                        <motion.div
                                            className="col-xs-12 col-lg-6 col-xl-4"
                                            key={product._id}
                                            initial={{
                                                scale: 0.7,
                                            }}
                                            whileInView={{
                                                scale: 1,
                                                transition: {
                                                    duration: 0.5,
                                                }
                                            }}
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                        >
                                            <ProductCard
                                                productDetails={product}
                                                setIsDisplayShareOptionsBox={setIsDisplayShareOptionsBox}
                                                convertedPrice={convertedPrice}
                                                currencyNameByCountry={currencyNameByCountry}
                                                isFavoriteProductForUserAsProperty={isFavoriteProductForUser(favoriteProductsListForUserByProductsIdsAndUserId, product._id)}
                                                isExistProductInsideTheCartAsProperty={isExistProductInsideTheCart(product._id)}
                                                setSharingName={setSharingName}
                                                setSharingURL={setSharingURL}
                                                currentDateAsString={currentDate}
                                                isFlashProductAsProperty={isExistOfferOnProduct(currentDate, product.startDiscountPeriod, product.endDiscountPeriod)}
                                                setIsDisplayErrorPopup={setIsDisplayErrorPopup}
                                                setErrorType={setErrorType}
                                            />
                                        </motion.div>
                                    ))}
                                    {totalPagesCount.forProducts > 1 &&
                                        <PaginationBar
                                            totalPagesCount={totalPagesCount.forProducts}
                                            currentPage={currentPage.forProducts}
                                            getPreviousPage={getPreviousPage}
                                            getNextPage={getNextPage}
                                            getSpecificPage={getSpecificPage}
                                            paginationButtonTextColor={"#FFF"}
                                            paginationButtonBackgroundColor={"transparent"}
                                            activePaginationButtonColor={"#000"}
                                            activePaginationButtonBackgroundColor={"#FFF"}
                                            section="products"
                                        />}
                                </div>
                            </section>
                            {/* End Last Added Products */}
                            {/* Start Brands Section */}
                            {appearedSections.includes("brands") && <section className="brands mb-5">
                                <h2 className="section-name text-center mb-5 text-white h4">{t("Brands")}</h2>
                                <div className="row brands-box section-data-box pt-4 pb-4">
                                    {isGetBrands && <SectionLoader />}
                                    {!isGetBrands && allBrandsInsideThePage.length > 0 && allBrandsInsideThePage.map((brand) => (
                                        <motion.div
                                            className="col-xs-12 col-lg-6 col-xl-4"
                                            key={brand._id}
                                            initial={{
                                                scale: 0.7,
                                            }}
                                            whileInView={{
                                                scale: 1,
                                                transition: {
                                                    duration: 0.5,
                                                }
                                            }}
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                        >
                                            <BrandCard
                                                brandDetails={brand}
                                            />
                                        </motion.div>
                                    ))}
                                    {!isGetBrands && allBrandsInsideThePage.length === 0 && <NotFoundError errorMsg={t("Sorry, Not Found Any Brands !!")} />}
                                </div>
                                {!isGetBrands && allBrandsInsideThePage.length !== 0 && <Link href={`/all-brands-of-the-store?storeId=${storeDetails._id}`} className="mb-4 d-block mx-auto text-center show-btn">{t("Show All Brands")}</Link>}
                            </section>}
                            {/* End Brands Section */}
                            {/* Start Stores Section */}
                            {appearedSections.includes("stores") && <section className="stores mb-5 pt-5 h4">
                                <h2 className="section-name text-center mb-4 text-white h4">{t("Stores")}</h2>
                                <div className="row filters-box mb-4">
                                    <div className="col-12">
                                        <motion.form
                                            className="search-form"
                                            initial={getInitialStateForElementBeforeAnimation()}
                                            whileInView={getAnimationSettings}
                                        >
                                            <div className="store-name-field-box searched-field-box">
                                                <input
                                                    type="text"
                                                    placeholder={t("Please Enter The Name Of The Store You Want To Search For")}
                                                    className="form-control"
                                                    onChange={(e) => handleChangeFilters(e, "stores")}
                                                />
                                                <div className={`icon-box ${i18n.language === "ar" ? "ar-language-mode" : "other-languages-mode"}`}>
                                                    <FaSearch className="icon" onClick={(e) => searchOnStore(e, filters.forStores)} />
                                                </div>
                                            </div>
                                        </motion.form>
                                    </div>
                                </div>
                                <div className="row stores-box section-data-box pt-4 pb-4">
                                    {isGetStores && <SectionLoader />}
                                    {!isGetStores && allStoresInsideThePage.length > 0 && allStoresInsideThePage.map((store) => (
                                        <motion.div
                                            className="col-xs-12 col-lg-6 col-xl-4"
                                            key={store._id}
                                            initial={{
                                                scale: 0.7,
                                            }}
                                            whileInView={{
                                                scale: 1,
                                                transition: {
                                                    duration: 0.5,
                                                }
                                            }}
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                        >
                                            <StoreCard
                                                storeDetails={store}
                                                setIsDisplayShareOptionsBox={setIsDisplayShareOptionsBox}
                                                setSharingName={setSharingName}
                                                setSharingURL={setSharingURL}
                                            />
                                        </motion.div>
                                    ))}
                                    {!isGetStores && allStoresInsideThePage.length === 0 && <NotFoundError errorMsg={t("Sorry, There Is Not Found Stores Now !!")} />}
                                </div>
                                {totalPagesCount.forStores > 1 &&
                                    <PaginationBar
                                        totalPagesCount={totalPagesCount.forStores}
                                        currentPage={currentPage.forStores}
                                        getPreviousPage={getPreviousPage}
                                        getNextPage={getNextPage}
                                        getSpecificPage={getSpecificPage}
                                        paginationButtonTextColor={"#FFF"}
                                        paginationButtonBackgroundColor={"transparent"}
                                        activePaginationButtonColor={"#000"}
                                        activePaginationButtonBackgroundColor={"#FFF"}
                                        section="stores"
                                    />}
                            </section>}
                            {/* End Stores Section */}
                        </> : <NotFoundError errorMsg={t("Sorry, This Store Is Not Found !!")} />}
                        <div className="contact-icons-box" onClick={() => setIsDisplayContactIcons(value => !value)}>
                            <ul className="contact-icons-list">
                                {isDisplayContactIcons && <li className="contact-icon-item mb-3">
                                    <a href={`mailto:${process.env.CONTACT_EMAIL}`} target="_blank"><MdOutlineMail className="mail-icon" /></a>
                                </li>}
                                {isDisplayContactIcons && appearedSections.includes("whatsapp button") && <li className="contact-icon-item mb-3">
                                    <a href={`https://wa.me/${process.env.CONTACT_NUMBER}?text=welcome`} target="_blank"><FaWhatsapp className="whatsapp-icon" /></a>
                                </li>}
                                {!isDisplayContactIcons && <li className="contact-icon-item"><MdOutlineContactPhone className="contact-icon" /></li>}
                                {isDisplayContactIcons && <li className="contact-icon-item"><FaTimes className="close-icon" /></li>}
                            </ul>
                        </div>
                        {/* End Contact Icons Box */}
                    </div>
                    <Footer />
                </div>
            </>}
            {isLoadingPage && !errorMsgOnLoadingThePage && <LoaderPage />}
            {errorMsgOnLoadingThePage && <ErrorOnLoadingThePage errorMsg={errorMsgOnLoadingThePage} />}
        </div >
    );
}

export async function getServerSideProps({ query }) {
    const allowedCountries = ["kuwait", "germany", "turkey"];
    if (query.country) {
        if (!allowedCountries.includes(query.country)) {
            if (query.storeId) {
                return {
                    redirect: {
                        permanent: false,
                        destination: `/?storeId=${query.storeId}`,
                    },
                    props: {
                        countryAsProperty: process.env.BASE_COUNTRY,
                        storeId: query.storeId,
                    },
                }
            }
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                },
                props: {
                    countryAsProperty: process.env.BASE_COUNTRY,
                },
            }
        }
        if (Object.keys(query).filter((key) => key !== "country" && key !== "storedId").length > 2) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/?country=${query.country}&storeId=${query.storeId}`,
                },
                props: {
                    countryAsProperty: query.country,
                    storeId: query.storeId,
                },
            }
        }
        return {
            props: {
                countryAsProperty: query.country,
                storeId: query.storeId,
            },
        }
    }
    if (query.storeId) {
        return {
            props: {
                countryAsProperty: process.env.BASE_COUNTRY,
                storeId: query.storeId,
            },
        }
    }
    return {
        props: {
            countryAsProperty: process.env.BASE_COUNTRY,
        },
    }
}