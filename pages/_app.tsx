import "../styles/globals.css";
import type { AppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progrss = new ProgressBar({
	size: 2,
	color: "#fe595e",
	className: "z-50",
	delay: 100,
});

Router.events.on("routeChangeStart", progrss.start);
Router.events.on("routeChangeComplete", progrss.finish);
Router.events.on("routeChangeError", progrss.finish);

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
