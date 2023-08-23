import React from 'react'
import ReactPortofolio from '../assets/portofolio/React-icon.svg.png';
import JavaPortofolio from '../assets/portofolio/java-4-logo.png';
import SpringBootPortofolio from '../assets/portofolio/spring-boot-logo.png';


const Experience = () => {
    const technologies = [
        {
            id: 1,
            src: JavaPortofolio,
            title: 'Java',
            style: 'shadow-white',
        },
        {
            id: 2,
            src: ReactPortofolio,
            title: 'ReactJs',
            style: 'shadow-cyan-500',
        },{
            id: 3,
            src: SpringBootPortofolio,
            title: 'SpringBoot',
            style: 'shadow-green-500',
        }
    ]
  return (
    <div name="experience" className='bg-gradient-to-b from-gray-800 to-black w-full text-white md:h-screen'>
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full text-white'>
        <div className='pb-8'>
            <p className='text-4xl font-bold inline border-b-4 border-gray-500'>Experience</p>
            <p className='py-6'>These are the technologies l've worked with</p>
        </div>

        <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0'>
            {
                technologies.map(({id, src, title, style}) => (
                <div key={id} className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}>
                    <img src={src} alt="" className='w-20 mx-auto' />
                    <p className='mt-4'>{title}</p>
                </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Experience
