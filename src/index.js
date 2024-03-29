import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { BrowserRouter } from "react-router-dom";

import "flag-icon-css/css/flag-icons.min.css";
import "core-js";
import "./assets/fonts/font-style.css";
import "./styles/light.css";
import "./styles/dark.css";
import "./styles/global.scss";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "react-toastify/dist/ReactToastify.css";
import "./api/interceptor";
import "./assets/fontawesome/pro/css/all.min.css";

i18n.use(initReactI18next)
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		supportedLngs: ["en", "fas"],
		fallbackLng: "en",
		detection: {
			order: ["cookie", "htmlTag", "localStorage", "path"],
			caches: ["cookie"],
		},
		backend: {
			loadPath: "locales/{{lng}}/translation.json",
		},
	});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
