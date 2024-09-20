import "@/styles/globals.css";
import "@/styles/Buttons.module.css";
import { Provider } from "react-redux";
import { store } from "@/toolkit/store";

export default function App({ Component, pageProps }) {
  return (
  
  <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  )
}
