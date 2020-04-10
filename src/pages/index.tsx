import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from '../components/base/header/Header';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header />
    <h1>Hi</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </Layout>
)

export default IndexPage
