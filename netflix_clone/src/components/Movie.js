import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { db } from '../firebase'
import { updateDoc,doc,arrayUnion } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'


const Movie = ({item}) => {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false);
    const {user} = UserAuth()
    const movieID= doc(db,'users',`${user?.email}`)
    const saveShow = async () =>{
        if(user?.email){
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID,{
                savedShows: arrayUnion({
                    id:item.id,
                    title:item.title,
                    img:item.backdrop_path
                })
            })
        }else{
            alert('Please log in to save a movie')
        }
    }
    return (
        
            <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:W-[280px] inline-block cursor-pointer relative p-2'>
            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
            <div className='absolute w-full h-full hover:bg-black/80 top-0 left-0 opacity-0 hover:opacity-100 text-white'>
            <p className= 'whitespace-normal flex justify-center text-xs md:text-sm font-bold items-center h-full text-center'>{item?.title}</p>
                <p onClick={saveShow}>
                    {like ? <FaHeart className='absolute top-4 left-4 text-gray-300'/> : <FaRegHeart className='absolute top-4 left-4 text-gray-300'/>}
                </p>
            </div>
        </div>
        
    )
}

export default Movie