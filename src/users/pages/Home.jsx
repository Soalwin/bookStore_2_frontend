import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { homeBooksApi } from '../../services/allApis'
import { searchKeyContext } from '../../context/ContextShare'
import { toast, ToastContainer } from 'react-toastify'





const Home = () => {

  const [homeBooks, setHomeBooks] = useState([])

  const { searchKey, setSearchKey } = useContext(searchKeyContext)

  const navigate = useNavigate()




  const getHomeBooks = async () => {

    const result = await homeBooksApi()
    const arr = result.data
    console.log(arr);
    setHomeBooks(arr)

  }


  const handleSearch = () => {

    const token=sessionStorage.getItem('token')

    if(searchKey==''){
      toast.info('please fill.')
    }else if(!token){
      toast.info('please login')
      setTimeout(() => {

        navigate('/login')
        
      }, 2000);
    }else if(searchKey && token){

      navigate('/all-books')

    }else{
      toast.error('something went wrong')
    }

  }


  useEffect(() => {

    getHomeBooks()
    setSearchKey('')

  }, [])



  return (
    <>
      <Header />
      <div className="w-full">
        {/* landing*/}
        <header className="flex justify-center items-center">
          <div id="main" className="flex items-center justify-center w-full">
            <div className="md:grid md:grid-cols-3 w-full">
              <div></div>
              <div className="text-white flex justify-center items-center flex-col text-center px-5">
                <h1 className="text-4xl md:text-5xl font-bold">Wonderful Gifts</h1>
                <p className="mt-2 text-sm md:text-base">Give your family and friends a book</p>
                <div className="mt-5 flex justify-center items-center">
                  <input
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder="Search Book"
                    className="ps-5 pe-5 text-black bg-white rounded-full w-56 md:w-64 p-2"
                    type="text"
                  />
                  <FontAwesomeIcon
                    onClick={handleSearch}
                    style={{ marginLeft: '-35px' }}
                    className="text-2xl text-black"
                    icon={faMagnifyingGlass}
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </header>

        {/*Arrivals */}
        <div className=' my-10'>
          <section className="flex justify-center items-center flex-col md:p-10 md:px-20 p-5">
            <h2 className="text-2xl font-bold">NEW ARRIVALS</h2>
            <h4 className="text-gray-600">Explore Our Latest Collection</h4>
          </section>

          <div className="px-5 md:px-40">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-6">
              {homeBooks &&

                homeBooks?.map(book => (

                  <div className="p-3 flex flex-col items-center text-center">
                    <img
                      className="w-full max-w-xs rounded-md shadow-md"
                      src={book?.imgUrl}
                      alt="cover page"
                    />
                    <p>{book?.author}</p>
                    <p>{book?.title}</p>
                    <p>{book?.price}</p>
                  </div>

                ))


              }

            </div>
          </div>

          <div className="flex justify-center items-center my-8">
            <Link to={'/all-books'}>
              <button className="bg-blue-900 text-white p-3 rounded-xl border border-blue-900 hover:bg-white hover:text-blue-900 transition">
                Explore More
              </button>
            </Link>
          </div>
        </div>

        {/*Authors */}
        <section className="flex flex-col justify-center items-center">
          <div className="md:grid md:grid-cols-2 w-full">
            <div className="flex flex-col justify-center items-center md:p-10 p-6 md:px-16">
              <h4 className="uppercase text-sm font-semibold">Featured Authors</h4>
              <h2 className="text-2xl font-bold">Captivates with every word</h2>
              <p className="text-justify mt-6 text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt culpa, debitis accusamus officiis
                perferendis, pariatur obcaecati est, totam recusandae corrupti quis eos atque sapiente laudantium hic!
                Corporis sit vero laudantium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt natus
                odio tempore, repellendus dolorum debitis ea maxime consequuntur cum, impedit eos fuga dolor asperiores
                modi. Impedit mollitia voluptatem soluta ratione.
              </p>
              <p className="text-justify mt-6 text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt culpa, debitis accusamus officiis
                perferendis, pariatur obcaecati est, totam recusandae corrupti quis eos atque sapiente laudantium hic!
                Corporis sit vero laudantium!
              </p>
            </div>
            <div className="p-6 flex justify-center items-center">
              <img
                className="h-80 md:h-96 object-cover rounded-xl shadow-md"
                src="https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid&w=740&q=80"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="flex flex-col justify-center items-center md:p-10 md:px-20 p-5 text-center">
          <h2 className="text-2xl font-bold">TESTIMONIALS</h2>
          <h4 className="text-gray-600">See what others are saying</h4>
          <div className="flex flex-col justify-center items-center mt-6 max-w-2xl">
            <img
              style={{ height: '100px', width: '100px', borderRadius: '50%' }}
              src="https://static.vecteezy.com/system/resources/thumbnails/033/129/417/small/a-business-man-stands-against-white-background-with-his-arms-crossed-ai-generative-photo.jpg"
              alt=""
            />
            <h6 className="font-semibold mt-2">Alex</h6>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, neque doloribus laboriosam ratione
              sapiente debitis facere consectetur quaerat soluta? Nam optio nobis laboriosam, cum minus nesciunt
              asperiores maxime nulla labore?
            </p>
          </div>
        </section>
      </div>

      <ToastContainer theme='colored' position='top-center' autoClose='2000' />
      <Footer />
    </>
  )
}

export default Home
