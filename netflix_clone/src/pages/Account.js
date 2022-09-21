import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
    return (
        <>
        <div className='w-full text-white'>
            <img className='h-[400px] w-full object-cover' src="netflixbackground.jpg" alt="/" />
        
        <div className='bg-black/60 fixed w-full top-0 left-0 h-[550px]'></div>
        <div className='top-[20%] absolute p-4 md:p-8'>
            <h1 className='text-3xl font-bold md:text-5xl'>My Shows</h1>
        </div>
        </div>
        <SavedShows/>
        </>
    )
}

export default Account