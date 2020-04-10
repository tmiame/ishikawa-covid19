import React from 'react';

export default function HTML(props: {
  htmlAttributes: {};
  headComponents: [];
  bodyAttributes: {};
  preBodyComponents: [];
  body: string;
  postBodyComponents: [];
}) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const supportsDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
            if (supportsDarkMode) {
              document.documentElement.setAttribute('dark', '');
              document.documentElement.classList.add('is-dark');
              document.body.style.backgroundColor = 'rgb(18, 21, 22)'
            }
        `,
          }}
        />
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Noto+Sans+JP:wght@500;900&display=swap"
          rel="stylesheet"
        ></link>
      </body>
    </html>
  );
}
