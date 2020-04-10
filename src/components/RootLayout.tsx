import React from "react";
import { Helmet } from "react-helmet";

export default function RootLayout({ children }) {
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600&display=swap" />
      </Helmet>
      <h1>ook</h1>
      {children}
    </div>
  );
}