import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { adminProfileUpdateApi } from '../../services/allApis'
import { serverURL } from '../../services/serverURL'
import { toast, ToastContainer } from 'react-toastify'
import { adminProfileContext } from '../../context/ContextShare'

const AdminSettings = () => {

  const { adminProfile, setAdminProfile } = useContext(adminProfileContext)


  const [adminDetails, setAdminDetails] = useState({

    username: "",
    password: "",
    cPassword: "",
    profile: ""

  })

  const [preview, setPreview] = useState("")

  const [token, setToken] = useState("")

  const [existingImg, setExistingImg] = useState("")

  const [updateStatus, setUpdateStatus] = useState({})

  console.log(adminDetails);


  const handleAddFile = (e) => {

    const file = e.target.files[0]

    setAdminDetails({ ...adminDetails, profile: file })
    console.log(adminDetails);

    if (file) {

      const url = URL.createObjectURL(file)
      setPreview(url)

    }

  }
  console.log(preview);

  const handleReset = () => {

    if (sessionStorage.getItem('token')) {
      // const t = sessionStorage.getItem('token')
      // setToken(t)

      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingImg(user.profile)
      //console.log(existingImg);
    }
    setPreview("")

  }

  const handleUpdate = async () => {

    const { username, password, cPassword, profile } = adminDetails

    if (!username || !password || !cPassword) {
      alert("please fill the form")
    } else {


      if (password != cPassword) {

        toast.info('Password not matching.')

      } else {

        if (preview) {

          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const body = new FormData()

          for (let key in adminDetails) {
            body.append(key, adminDetails[key])
          }

          const result = await adminProfileUpdateApi(body, reqHeader)
          console.log(result);

          if (result.status == 200) {

            toast.success("Updated succesfuly.")

            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfile(result.data)

          } else {

            toast.error("something went wrong.")

          }

        } else {

          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const result = await adminProfileUpdateApi({ username, password, profile: existingImg }, reqHeader)
          console.log(result);

          if (result.status == 200) {

            toast.success("Updated succesfuly.")

            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfile(result.data)

          } else {

            toast.error("something went wrong.")

          }

        }

      }
    }

  }

  // const handleUpdate = async () => {
  //   const { username, password, cPassword, profile } = adminDetails;

  //   if (!username || !password || !cPassword) {
  //     return alert("please fill the form");
  //   }

  //   if (password !== cPassword) {
  //     return toast.info("Password not matching.");
  //   }

  //   const reqHeader = {
  //     "Authorization": `Bearer ${token}`
  //   };

  //   let body = new FormData();

  //   if (preview) {
  //     // user uploaded new image
  //     for (let key in adminDetails) {
  //       body.append(key, adminDetails[key]);
  //     }
  //   } else {
  //     // NO NEW IMAGE — SEND FORMDATA (not JSON)
  //     body.append("username", username);
  //     body.append("password", password);
  //     body.append("profile", existingImg); // use old filename
  //   }

  //   const result = await adminProfileUpdateApi(body, reqHeader);
  //   console.log(result);

  //   if (result.status === 200) {
  //     toast.success("Updated successfully.");
  //     sessionStorage.setItem("existingUser", JSON.stringify(result.data));
  //     setUpdateStatus(result.data);
  //   } else {
  //     toast.error("Something went wrong.");
  //   }
  // };



  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const t = sessionStorage.getItem('token')
      setToken(t)
    }

    const user = JSON.parse(sessionStorage.getItem('existingUser'))
    setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
    setExistingImg(user.profile)
    console.log(existingImg);


  }, [updateStatus])



  return (
    <>
      <AdminHeader />

      <div className=' grid md:grid-cols-[1fr_4fr]'>

        <div>
          <AdminSidebar />
        </div>
        <div>
          <h1 className=' text-center text-3xl'>Settings</h1>
          <div className=' grid md:grid-cols-2'>

            <div className=' flex justify-center items-center px-10 py-5'>
              <p className=' text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vel quam esse sequi odio ducimus consequuntur excepturi in. Beatae voluptatibus fugiat illo placeat atque in necessitatibus eaque aliquam molestiae ratione.
                Incidunt reprehenderit quaerat ab quas sit aperiam eius quia, illo iste et optio ratione sunt? Est assumenda maxime perferendis aut! Optio, provident. Dolor sed rerum repellendus exercitationem. <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error libero asperiores ex atque ea inventore temporibus deserunt dignissimos nesciunt sed, dolorum at expedita repellat porro itaque, consectetur aperiam nostrum nam!
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae excepturi neque culpa aliquam ab laudantium harum, dolor blanditiis, fugit mollitia nulla iste fuga quis voluptate aut? Adipisci ducimus facilis vero!
              </p>
            </div>
            <div className=' p-5'>
              <div className=' bg-blue-300 p-10 rounded'>

                <div className=' flex flex-col'>
                  <div className=' md:px-10 lg:px-20 pb-5 flex items-baseline-last'>

                    {existingImg == "" ?

                      <img style={{width:"100%", height:"100%", borderRadius:"50%"}} src={preview ? `${preview}` : "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"} alt="" />
                      :
                      <img style={{width:"100%", height:"100%", borderRadius:"50%"}} src={preview ? `${preview}` : `${serverURL}/upload/${existingImg}`} alt="" />

                    }

                    <div className=' flex align-bottom'>
                      <input type="file" id='file' className=' hidden' onChange={(e) => handleAddFile(e)} />
                      <label htmlFor="file" className=' bg-yellow-500 p-1 lg:p-3 rounded text-white'><FontAwesomeIcon icon={faPencil} /></label>
                    </div>
                  </div>
                  <div className=' flex flex-col w-full gap-3'>
                    <input value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" className=' bg-white rounded p-2' placeholder=' Username' />
                    <input value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" className=' bg-white rounded p-2' placeholder=' Password' />
                    <input value={adminDetails.cPassword} onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" className=' bg-white rounded p-2' placeholder=' Confirm Password' />
                    <div className=' flex justify-evenly gap-3'>
                      <button type='button' onClick={handleReset} className=' w-full p-2 bg-red-600 text-white rounded'>Reset</button>
                      <button type='button' onClick={handleUpdate} className=' w-full p-2 bg-green-600 text-white rounded'>Update</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <ToastContainer theme='colored' position='top-center' autoClose='2000' />



      <Footer />
    </>
  )
}

export default AdminSettings