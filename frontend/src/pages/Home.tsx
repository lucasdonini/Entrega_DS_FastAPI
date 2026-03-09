import Navbar from '../components/Navbar/Navbar'
import PagUm from '../components/PagUm/PagUm'
import PagDois from '../components/PagDois/PagDois'
import Footer from '../components/Footer/Footer'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => sessionStorage.clear(), [])

  return (
    <>
      <Navbar />
      <main style={{ margin: 0 }}>
        <PagUm />
        <PagDois />
        <Footer />
      </main>
    </>
  )
}