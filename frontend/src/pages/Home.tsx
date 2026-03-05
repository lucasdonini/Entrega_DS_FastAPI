import Navbar from '../components/Navbar/Navbar'
import PagUm from '../components/PagUm/PagUm'
import PagDois from '../components/PagDois/PagDois'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <PagUm />
        <PagDois />
        <Footer />
      </main>
    </>
  )
}