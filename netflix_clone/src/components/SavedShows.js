import React, {useState,useEffect} from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { onSnapshot, doc, updateDoc } from 'firebase/firestore'
const SavedShows = () => {
    const [movies, setMovies] = useState([])
    const {user} = UserAuth()
    const slideLeft= () => {
        var slider= document.getElementById('slider');
        slider.scrollLeft=slider.scrollLeft - 500
        }
    const slideRight = () =>{
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
        }
        useEffect(()=>{
            onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
                setMovies(doc.data()?.savedShows);
            })
        },[user?.email])
        const movieRef = doc(db,'users',`${user?.email}`)
        const deleteShow = async (passedId) => {
            try {
                const result = movies.filter((item)=>item.id !== passedId)
                await updateDoc(movieRef,{
                    savedShows:result,
                })
            } catch (error) {
                console.log(error);
            }
        }
    return (
        <>
        <h2 className='text-white font-bold md:text-xl p-4' >My Shows</h2>
        <div className='relative flex items-center group'>
        <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block' size={40}/>
            <div id={'slider' } className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
            {movies.map((item,id)=>(
            <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:W-[280px] inline-block cursor-pointer relative p-2'>
            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
            <div className='absolute w-full h-full hover:bg-black/80 top-0 left-0 opacity-0 hover:opacity-100 text-white'>
            <p className= 'whitespace-normal flex justify-center text-xs md:text-sm font-bold items-center h-full text-center'>{item?.title}</p>
            <p onClick={()=>deleteShow(item.id)} className='absolute top-4 right-4 text-gray-300'><AiOutlineClose/></p>
            </div>
        </div>
        ))}
        </div>
        <MdChevronRight onClick={slideRight} className='bg-white rounded-full right-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block' size={40}/>
        </div>
        </>
    )
}

export default SavedShows