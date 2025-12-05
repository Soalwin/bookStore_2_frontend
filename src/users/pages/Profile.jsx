import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faCircleCheck, faL, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { addBookApi } from '../../services/allApis'

const Profile = () => {


  const [sellBookSatus, setSellBookStatus] = useState(true)
  const [userBookStatus, setUserBookStatus] = useState(false)
  const [purchaseBook, setPurchaseBook] = useState(false)


  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    nop: '',
    imgUrl: '',
    price: '',
    discountPrice: '',
    abstract: '',
    publisher: '',
    language: '',
    isbn: '',
    category: '',
    uploadImg: []
  })

  const [preview, setPreview] = useState('')
  const [previewList, setPreviewList] = useState([])

  const [token, setToken] = useState('')
  //console.log(bookDetails);


  const handleUpload = (e) => {

    console.log(e.target.files[0]);

    const fileArray = bookDetails.uploadImg
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImg: fileArray })

    console.log(bookDetails);

    if (previewList.length < 3) {
      const url = URL.createObjectURL(e.target.files[0])
      console.log(url);
      const a = previewList
      a.push(url)
      setPreview(a)
      setPreviewList(a)

    } else {

      toast.error('Only 3 images allowed.')

    }


  }


  const handleReset = () => {

    setBookDetails({
      title: '',
      author: '',
      nop: '',
      imgUrl: '',
      price: '',
      discountPrice: '',
      abstract: '',
      publisher: '',
      language: '',
      isbn: '',
      category: '',
      uploadImg: []
    })

    setPreview('')
    setPreviewList([])

  }


  const handleSubmit = async () => {

    const { title, author, nop, imgUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg } = bookDetails

    console.log(title, author, nop, imgUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg);


    if (!title || !author || !nop || !imgUrl || !price || !discountPrice || !abstract || !publisher || !language || !isbn || !category || uploadImg.length == 0) {

      toast.warning("Please fill all the fields")

    } else {

      console.log(token);

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const reqBody = new FormData()

      for (let key in bookDetails) {

        if (key != "uploadImg") {

          reqBody.append(key, bookDetails[key])

        } else {

          bookDetails.uploadImg.forEach((item) => {

            reqBody.append("uploadImg", item)

          })

        }

      }

      console.log(reqBody, reqHeader, bookDetails);

      const result = await addBookApi(reqBody, reqHeader)
      console.log(result);

      if (result.status == 200) {

        toast.success("Book added")
        setBookDetails({
          title: '',
          author: '',
          nop: '',
          imgUrl: '',
          price: '',
          discountPrice: '',
          abstract: '',
          publisher: '',
          language: '',
          isbn: '',
          category: '',
          uploadImg: []
        })

        setPreview('')
        setPreviewList([])

      } else if (result.status == 400) {

        toast.error("Book not added, failed!")

      } else {

        toast.error("Something went wrong")

      }

    }

  }


  useEffect(() => {

    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      setToken(token)
    }

  }, [])



  return (
    <div>
      <Header />

      <div style={{ height: "200px" }} className=' bg-gray-900'></div>
      <div style={{ width: "230px", height: "230px", borderRadius: "50%", marginLeft: "70px", marginTop: "-150px" }}>
        <img style={{ height: "200px", width: "200px", borderRadius: "50%" }} src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
      </div>

      <div className=' flex p-5 md:px-20 mt-2 items-center justify-between'>

        <div className=' flex flex-wrap justify-center items-center'>
          <p className=' ms-5 text-3xl'>Abhiram</p>
          <FontAwesomeIcon icon={faCircleCheck} className=' text-blue-600 ms-2' />
        </div>

        <EditProfile />
      </div>

      <p className=' px-5 md:px-20 py-4 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, officia officiis. Delectus itaque aperiam voluptatum eius repudiandae autem, molestias odio ut similique repellat nam eum officia saepe consequuntur fugit quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nisi veniam minima distinctio. Fuga quasi voluptatibus veritatis officia asperiores officiis reiciendis corporis eligendi similique explicabo corrupti ab, dolor eos ullam.</p>

      {/* tabs */}
      <div className=' flex justify-center items-center my-5 gap-0'>

        <p onClick={() => { setSellBookStatus(true); setUserBookStatus(false); setPurchaseBook(false) }} className={sellBookSatus ? ' p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded-t cursor-pointer' : userBookStatus ? 'p-4 text-black border-b border-gray-200' : ' p-4 text-black border-b border-gray-200'}>Sell Books</p>
        <p onClick={() => { setSellBookStatus(false); setUserBookStatus(true); setPurchaseBook(false) }} className={userBookStatus ? ' p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded-t cursor-pointer' : sellBookSatus ? 'p-4 text-black border-b border-gray-200' : ' p-4 text-black border-b border-gray-200'}>My Books Status</p>
        <p onClick={() => { setSellBookStatus(false); setUserBookStatus(false); setPurchaseBook(true) }} className={purchaseBook ? ' p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded-t cursor-pointer' : sellBookSatus ? 'p-4 text-black border-b border-gray-200' : ' p-4 text-black border-b border-gray-200'}>Purchase Books</p>

      </div>



      {/* content */}
      {
        sellBookSatus &&
        <div className=' bg-gray-200 p-5 md:p-10 md:m-20 m-10'>

          <h1 className=' text-center text-3xl font-medium'>Book Details</h1>
          <div className=' md:grid md:grid-cols-2 mt-5 w-full'>
            <div className=' md:px-3'>
              <div className=' mb-3'>
                <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} placeholder='title' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} placeholder='Author' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.nop} onChange={(e) => setBookDetails({ ...bookDetails, nop: e.target.value })} placeholder='No of Pages' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.imgUrl} onChange={(e) => setBookDetails({ ...bookDetails, imgUrl: e.target.value })} placeholder='Image URL' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} placeholder='Price' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.discountPrice} onChange={(e) => setBookDetails({ ...bookDetails, discountPrice: e.target.value })} placeholder='Discount Price' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} placeholder='Abstract' className=' h-60 p-2 bg-white rounded placeholder-gray-500 w-full' name="" id=""></textarea>
              </div>

            </div>
            <div className=' md:px-3'>
              <div className=' mb-3'>
                <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} placeholder='Publisher' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} placeholder='Language' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} placeholder='ISBN' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3'>
                <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} placeholder='Category' type="text" className=' p-2 bg-white rounded placeholder-gray-500 w-full' />
              </div>
              <div className=' mb-3 flex justify-center-safe items-center w-full'>
                {!preview ?

                  <label htmlFor="imagefile">
                    <input type="file" name="" id="imagefile" style={{ display: "none" }} onChange={(e) => handleUpload(e)} />
                    <img src="https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1-1-580x386.jpg" alt="" style={{ height: "200px" }} />
                  </label>

                  :

                  <label htmlFor="imagefile">
                    <img src={preview} alt="" style={{ height: "200px" }} />
                  </label>

                }

              </div>

              {preview &&

                <div className=' flex justify-center items-center gap-3'>


                  {previewList?.map((item) => (

                    <img src={item} alt="" style={{ width: "70px" }} />

                  ))

                  }


                  <label htmlFor="imagefile">

                    <input type="file" name="" id="imagefile" style={{ display: "none" }} onChange={(e) => handleUpload(e)} />

                    <FontAwesomeIcon icon={faSquarePlus} className=' text-5xl' />
                  </label>


                </div>

              }
            </div>

          </div>
          <div className=' flex justify-end'>
            <div className=' flex justify-center items-center gap-3 mt-5'>
              <button onClick={handleReset} className=' border p-2 text-white bg-red-600 rounded hover:border hover:bg-white hover:border-red-600 hover:text-red-600'>Reset</button>
              <button onClick={handleSubmit} className='p-2 border text-white bg-green-600 rounded hover:border hover:bg-white hover:border-green-600 hover:text-green-600'>Submit</button>
            </div>
          </div>

        </div>
      }
      {
        userBookStatus &&
        <div className=' p-10 my-20 shadow rounded'>
          <div className=' bg-gray-200 p-4 rounded'>
            <div className=' md:grid grid-cols-[3fr_1fr]'>
              <div>
                <h1 className=' text-4xl font-bold'>Title</h1>
                <h2 className='text-2xl font-semibold'>Author</h2>
                <h3 className=' text-xl'>$ Price</h3>
                <p>Abstract : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, modi. Quisquam, magni voluptates reprehenderit voluptatibus blanditiis tempore modi cumque quod minima quas omnis consectetur debitis dolore laudantium vitae quos neque.</p>

                <div className=' flex'>
                  <img src="https://psdstamps.com/wp-content/uploads/2022/04/pending-stamp-png.png" style={{ width: "120px" }} alt="Pending..." />
                  <img src="https://www.citypng.com/public/uploads/preview/hd-green-round-approved-stamp-png-7017516946281143xalzzggez.png?v=2025090208" style={{ width: "100px" }} alt="Pending..." />
                  <img src="https://png.pngtree.com/png-vector/20230607/ourmid/pngtree-rejected-stamp-with-red-color-vector-png-image_7121303.png" style={{ width: "100px" }} alt="Pending..." />
                </div>
              </div>
              <div>
                <div className=' flex justify-end'>
                  <img style={{ height: "300px" }} src="https://static-cse.canva.com/blob/2200116/1024w-bVa1FCunN4Y.jpg" alt="" />

                </div>                <div className=' flex justify-end mt-4'>
                  <button className=' p-3 bg-red-600 text-white rounded'>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div className=' flex  flex-col justify-center items-center'>
            <img src="https://miro.medium.com/v2/resize:fit:1400/0*GUYQoLJ08bNdTigR.gif" alt="" />
            <h1 className=' font-bold text-red-600 text-4xl'>No Books Found !</h1>
          </div>

        </div>
      }
      {
        purchaseBook &&
        <div className=' p-10 my-20 shadow rounded'>
          <div className=' bg-gray-200 p-4 rounded'>
            <div className=' md:grid grid-cols-[3fr_1fr]'>
              <div>
                <h1 className=' text-4xl font-bold'>Title</h1>
                <h2 className='text-2xl font-semibold'>Author</h2>
                <h3 className=' text-xl'>$ Price</h3>
                <p>Abstract : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, modi. Quisquam, magni voluptates reprehenderit voluptatibus blanditiis tempore modi cumque quod minima quas omnis consectetur debitis dolore laudantium vitae quos neque.</p>

                <div className=' flex'>
                  <img src="https://psdstamps.com/wp-content/uploads/2022/04/pending-stamp-png.png" style={{ width: "120px" }} alt="Pending..." />
                  <img src="https://www.citypng.com/public/uploads/preview/hd-green-round-approved-stamp-png-7017516946281143xalzzggez.png?v=2025090208" style={{ width: "100px" }} alt="Pending..." />
                  <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" style={{ width: "100px" }} alt="Pending..." />
                </div>
              </div>
              <div>
                <div className=' flex justify-end'>
                  <img style={{ height: "300px" }} src="https://static-cse.canva.com/blob/2200116/1024w-bVa1FCunN4Y.jpg" alt="" />

                </div>                <div className=' flex justify-end mt-4'>
                  <button className=' p-3 bg-red-600 text-white rounded'>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div className=' flex  flex-col justify-center items-center'>
            <img src="https://miro.medium.com/v2/resize:fit:1400/0*GUYQoLJ08bNdTigR.gif" alt="" />
            <h1 className=' font-bold text-red-600 text-4xl'>No Books Found !</h1>
          </div>

        </div>
      }




      <Footer />

      <ToastContainer theme='colored' position='top-center' autoClose='2000' />
    </div>
  )
}

export default Profile