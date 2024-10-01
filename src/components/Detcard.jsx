import React from 'react'

export default function Detcard({num, text, icon}) {
	return (
			<div className="text-[1.8vw] text-white text-center md:py-[5vh] xsm:py-[3vh] flex flex-col justify-center items-center">
				<i className={`${icon} md:text-[4vw] xsm:text-[15vw] text-blue-500 mb-5`}></i>
              <h1 className="md:text-[4vw] xsm:text-[6vw] text-zinc-800 md:mb-2 xsm:mb-4">{num}</h1>
              <p className='text-zinc-900 md:text-[0.9em] xsm:text-[2.6vw] '>{text}</p>
            </div>

	)
}