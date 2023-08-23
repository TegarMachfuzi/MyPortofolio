import React from 'react'
import ReactPortofolio from '../assets/portofolio/ReactPortofolio.webp';
import JavaPortofolio from '../assets/portofolio/JavaPortofolio.jpg';
import SpringBootPortofolio from '../assets/portofolio/SpringBootPortofolio.jpg';


const Portofolio = () => {
    const portofolios = [
        {
            id: 1,
            src: JavaPortofolio,
            href: 'http://localhost:3000/'
        },
        {
            id: 2,
            src: ReactPortofolio,
            href: 'http://localhost:3000/'
        },{
            id: 3,
            src: SpringBootPortofolio,
            href: 'http://localhost:3000/'
        }
    ]
  return (
    <div name='portofolio' className='bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen'>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-gray-500'>Portofolio</p>
                <p className='py-6'>Check out some of my work right here </p>
            </div>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
        {
                portofolios.map(({id, src, href}) => (
                    <div key={id} className='shadow-md shadow-gray-600 rounded-lg'>
                <img src={src} alt="" className='rounded-md duration-200 hover:scale-105'/>
                <div className='flex items-center justify-center'>
                    <button className={`w-10/12 px-6 py-3 m-4 duration-200 hover:scale-105 ${href}`}>Show</button>
                </div>
            </div>        
                ))
            }
            
        </div>
    </div>
</div>
  )
}

export default Portofolio
