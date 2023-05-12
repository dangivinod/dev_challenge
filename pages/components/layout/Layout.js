import Header from "./header/Header"
import Footer from "./footer/Footer"
import Head from "./header/Head"

function Layout({ children }) {
  return (
    <>
      <Header>
        <Head />
      </Header>
      {children}
      <Footer />
    </>
  )
}

export default Layout
