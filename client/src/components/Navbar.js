import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [nav, setNav] = useState(false)
    const [spotToken, setSpotToken] = useState(null)

    const handleNav = () => {
        setNav(!nav)
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token");

        if (token === null){
            setSpotToken(null)
        } else {
            setSpotToken(token)
        }

        const handleScroll = () => {
          setScrolled(window.scrollY > 0);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);
        
    return (
        <div className={`fixed left-0 top-0 w-full z-10 ease-in duration-300 pr-12 pl-16 pt-2 ${scrolled ? 'bg-light-blue' : 'bg-transparent'}`}>
            <div className='max-w-{1240px} m-auto flex justify-between items-center p-4 text-off-white'>
                {spotToken === null ? (
                    <Link href='/'>
                        <h1 className='font-bold text-4xl text-off-white hover:text-pink transition-all duration-500'>moodify.</h1>
                    </Link>
                ) : (
                    <Link href='/home'>
                        <h1 className='font-bold text-4xl text-off-white hover:text-pink transition-all duration-500'>moodify.</h1>
                    </Link>
                )}
                
                
                <ul className='hidden sm:flex'>
                    <li className='p-4 text-lg hover:text-pink hover:cursor-pointer transition-all duration-500'>
                        {spotToken === null ? (<Link href='/'> home </Link> ) : (<Link href='/home'> home </Link> )}
                    </li>
                    <li className='p-4 text-lg hover:text-pink hover:cursor-pointer transition-all duration-500'>
                        <Link href='/about'> about </Link>
                    </li>
                    <li className='p-4 text-lg hover:text-pink hover:cursor-pointer transition-all duration-500'>
                        <Link href='/privacy'> privacy policy </Link>
                    </li>
                    <li className='p-4 text-lg hover:text-pink hover:cursor-pointer transition-all duration-500'>
                        <Link href='/contact'> contact </Link>
                    </li>
                </ul>

                {/* Mobile Button */}
                <div onClick={handleNav} className='block sm:hidden z-10'>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>

                {/* Mobile Menu */}
                <div className={nav ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-500' :
            'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-500'}>
                    <ul>
                        <li className='p-4 text-4xl hover:text-light-blue'>
                            <Link onClick={handleNav} href='/'> Home </Link>
                        </li>
                        <li className='p-4 text-4xl hover:text-light-blue'>
                            <Link onClick={handleNav} href='/about'> About </Link>
                        </li>
                        <li className='p-4 text-4xl hover:text-light-blue'>
                            <Link onClick={handleNav} href='/privacy'> Privacy Policy </Link>
                        </li>
                        <li className='p-4 text-4xl hover:text-light-blue'>
                            <Link onClick={handleNav} href='/contact'> Contact </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;