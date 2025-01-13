
"use client"; 

import { Provider } from "react-redux";
import store from "@/redux/store/store";
import "./globals.css";
import HeadComponent from "@/components/head/HeadComponent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <HeadComponent />
      <body className="bg-gray-100">
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
