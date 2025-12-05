import { faEye, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewBookApi } from '../../services/allApis';
import { serverURL } from '../../services/serverURL';

const ViewBooks = () => {

    const [modal, setModal] = useState(false)
    const [book, setBook] = useState({})

    const { id } = useParams()


    const viewBook = async (id) => {

        const result = await viewBookApi(id)
        console.log(result);

        if (result.status == 200) {

            setBook(result.data)

        }

    }

    useEffect(() => {

        viewBook(id)

    }, [])



    return (
        <div>

            {book &&
                <div className=' grid md:grid-cols-[1fr_3fr] py-10 px-10 gap-5'>


                    <div>
                        <img className=' w-full' src={book?.imgUrl} alt="" />
                    </div>

                    <div>

                        <div className=' flex justify-end'>

                            <div>
                                <FontAwesomeIcon icon={faEye} onClick={() => setModal(true)} />
                            </div>

                        </div>

                        <div className=' flex justify-center items-center flex-col'>
                            <h1 className=' text-3xl font-bold'>{book?.title}</h1>
                            <h1 className=' text-2xl font-semibold'>{book?.author}</h1>


                        </div>

                        <div className=' grid md:grid-cols-2 lg:grid-cols-3 px-5'>

                            <p>Publisger : {book?.publisher}</p>
                            <p>Language : {book?.language}</p>
                            <p>No of Pages : {book?.nop}</p>
                            <p>Seller mail : {book?.userMail}</p>
                            <p>{book?.price}</p>
                            <p>{book?.isbn}</p>

                        </div>

                        <div className=' mt-10'>
                            <p>{book?.abstract}</p>
                        </div>

                        <div className=' mt-5 clear-both flex justify-end'>
                            <div className=' flex gap-2'>
                                <button className=' p-2 bg-red-600 text-white rounded'>Close</button>
                                <button className=' p-2 bg-green-600 text-white rounded'>Buy</button>
                            </div>
                        </div>

                    </div>




                </div>

            }

            {modal &&
                <div id='cardView' style={{ width: "100%", height: "100vh" }} className=' p-5 absolute bottom-0 flex justify-center items-end'>

                    <div className=' flex flex-col justify-center w-2xl md:w-3xl h-auto bg-white rounded p-10'>
                        <div className=' rounded-t text-white p-2 flex items-center justify-between bg-black'>
                            <h1>Quick photos</h1>
                            <FontAwesomeIcon icon={faX} onClick={() => setModal(false)} />

                        </div>
                        <div className=' h-auto w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5 bg-white rounded-b border border-black p-5'>
                            {book?.uploadImg.map(item => (

                                <div className=' flex justify-center'><img className=' h-60' src={`${serverURL}/upload/${item}`} alt="cover page" /></div>

                            ))

                            }

                        </div>
                    </div>

                </div>}

        </div>
    )
}

export default ViewBooks