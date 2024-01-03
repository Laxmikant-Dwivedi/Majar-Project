import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-100 shadow-md '>
        <div className='flex justify-between items-center max-w-6xl max-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
            <span className='text-blue-900'>Lord</span>
            <span className='text-blue-500'>Estate</span>
        </h1>
        </Link>
        <form action="" className='bg-slate-300 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-500 '/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
                <li className='hidden sm:inline text-blue-400 hover:underline'>Home</li>
            </Link>
            <Link to='/about' >
                <li className='hidden sm:inline text-blue-400 hover:underline'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover'     src={currentUser.avatar} alt='profile'/>
            )  : (
                <li className='text-blue-400 hover:underline'>Sign In</li>
            )}
            </Link>
            
        </ul>
        </div>
    </header>
  )
}
