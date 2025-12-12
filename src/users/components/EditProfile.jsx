import { faLocationDot, faPencil, faSquareArrowUpRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { userProfileUpdateApi } from '../../services/allApis';
import { toast, ToastContainer } from 'react-toastify';
import { serverURL } from '../../services/serverURL';
import { userProfileContext } from '../../context/ContextShare';

const EditProfile = () => {

  const { setUserProfile } = useContext(userProfileContext)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updateStatus, setUpdateStatus] = useState({})
  const [userDetails, setUserDetails] = useState({

    username: "",
    password: "",
    cPassword: "",
    profile: "",
    bio: ""

  })

  const [preview, setPreview] = useState('')
  const [existingImg, seExistingImg] = useState('')
  const [token, setToken] = useState('')


  const handleAddFile = (e) => {

    const file = e.target.files[0]

    setUserDetails({ ...userDetails, profile: file })

    if (file) {

      const url = URL.createObjectURL(file)
      setPreview(url)

    }

  }
  //console.log(userDetails);

  const handleUpdate = async () => {

    const { username, password, cPassword, profile, bio } = userDetails

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

          for (let key in userDetails) {
            body.append(key, userDetails[key])
          }

          const result = await userProfileUpdateApi(body, reqHeader)
          console.log(result);

          if (result.status == 200) {

            toast.success("Updated succesfuly.")

            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setUserDetails(result.data)
            setUserProfile(result.data)
            handleClose()


          } else {

            toast.error("something went wrong.")

          }

        } else {

          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const result = await userProfileUpdateApi({ username, password, profile: existingImg, bio }, reqHeader)
          console.log(result);

          if (result.status == 200) {

            toast.success("Updated succesfuly.")

            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setUserDetails(result.data)
            setUserProfile(result.data)
            handleClose()

          } else {

            toast.error("something went wrong.")

          }

        }

      }
    }

  }

  const handleReset = () => {

    if (sessionStorage.getItem('token')) {
      // const t = sessionStorage.getItem('token')
      // setToken(t)

      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setUserDetails({ username: user.username, password: user.password, cPassword: user.password, bio: user.bio })
      seExistingImg(user.profile)
      //console.log(existingImg);
    }
    setPreview("")

  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const t = sessionStorage.getItem('token')
      setToken(t)
    }

    const user = JSON.parse(sessionStorage.getItem('existingUser'))
    setUserDetails({ username: user.username, password: user.password, cPassword: user.password, bio: user.bio })
    seExistingImg(user.profile)
    console.log(existingImg);


  }, [updateStatus])


  return (
    <div>

      <button onClick={handleOpen} className=' p-2 bg-blue-600 text-white rounded'>Edit Profile</button>


      {open &&

        <div id='modal' className='fixed inset-0 flex justify-items-start items-center z-50'>
          <div className=' bg-white md:w-1/3 flex flex-col items-center p-10 h-full'>

            <div className=' flex justify-end w-full'>
              <button className=' text-2xl font-bold' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></button>
            </div>

            <div>
              {existingImg == "" ?

                <img style={{ height: "200px", width: "200px", borderRadius: "50%" }} src={preview ? preview : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"} alt="" />

                : existingImg.startsWith(" ") ?

                  <img style={{ height: "200px", width: "200px", borderRadius: "50%" }} src={preview ? preview : existingImg} alt="" />

                  :

                  <img style={{ height: "200px", width: "200px", borderRadius: "50%" }} src={preview ? preview : `${serverURL}/upload/${existingImg}`} alt="" />

              }
            </div>



            <div className=' flex align-bottom'>
              <input type="file" id='file' className=' hidden' onChange={(e) => handleAddFile(e)} />
              <label htmlFor="file" className=' bg-yellow-500 p-1 lg:p-3 rounded text-white'><FontAwesomeIcon icon={faPencil} /></label>
            </div>

            <div>
              <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} className=' rounded bg-white w-full p-2 border my-2' placeholder='Name' type="text" />
              <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className=' rounded bg-white w-full p-2 border my-2' placeholder='Password' type="text" />
              <input value={userDetails.cPassword} onChange={(e) => setUserDetails({ ...userDetails, cPassword: e.target.value })} className=' rounded bg-white w-full p-2 border my-2' placeholder='Confirm Password' type="text" />

              <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} className=' h-40 rounded bg-white border w-full p-2' placeholder='About' name="" id=""></textarea>


              <div className=' flex justify-end gap-2 items-center'>
                <button type='button' onClick={handleReset} className=' p-2 bg-red-600 text-white rounded'>Reset</button>
                <button onClick={handleUpdate} className=' bg-green-600 p-2 text-white rounded'>Save</button>
              </div>
            </div>

          </div>
        </div>

      }

      <ToastContainer theme='colored' position='top-center' autoClose='2000' />


    </div>
  )
}

export default EditProfile