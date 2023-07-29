import React from "react";
import Link from 'next/link';

const Landing = () => {
    return (
        <div className="text-off-white flex items-center justify-start pt-48">
            <div className="flex-col">
                <div>
                    <p className="text-5xl font-bold"> Express Your <span className="text-green">Mood</span> <br/> Through Music. </p>
                </div>
                <div className="pt-6">
                    <Link href='/login' className=" text-xl text-grey border border-green rounded-md px-12 py-2 bg-green hover:bg-off-white transition-all duration-500"> login </Link>  
                </div>
            </div>
                
        </div>
    )
}

export default Landing;