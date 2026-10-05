import Header from './components/Header.jsx'
import AboutUs from './components/AboutUs.jsx'
import About from './components/About.jsx'
import Products from './components/Products.jsx'
import Services from './components/Services.jsx'
import Applications from './components/Applications.jsx'
import Logos from './components/Logos.jsx'
import Plans from './components/Plans.jsx'
import Testimonials from './components/Testimonials.jsx'
import Faqs from './components/Faqs.jsx'
import Contact from './components/Contact.jsx'
import Footer, { Preloader } from './components/Footer.jsx'
import { useReveal, useSmoothScroll } from './hooks.js'

export default function App() {
  const revealRef = useReveal()
  useSmoothScroll()

  return (
    <div ref={revealRef} id="top">
      <Preloader />
      <Header />
      <AboutUs />
      <About />
      <Products />
      <Services />
      <Applications />
      <Logos />
      <Plans />
      <Testimonials />
      <Faqs />
      <Contact />
      <Footer />
    </div>
  )
}
