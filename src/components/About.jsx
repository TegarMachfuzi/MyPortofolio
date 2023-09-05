import React from 'react'

const About = () => {
  return (
    <div name="about" className='w-full h-screen bg-gradient-to-b from-gray-800
    to-black text-white'>
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
            <p className='text-4xl font-bold inline border-b-4 border-gray-500'>About</p>
        </div>

        <p className='text-xl mt-20'>Hello, I'm Tegar Machfudzi, I'm a Java developer.Over 1 years of working experience in developing Java Backend. I am good at working with a team. I can understand work quickly and can adapt quickly
        </p>

        <br />

        <p className='text-xl'>
        Where I work now I work as a backend developer. I work following the direction of the product owner in the team. the job of a backend developer is to provide data or stream data so that it can be displayed or retrieved by the android developer team.
        </p>
      </div>
    </div>
  )
}

export default About
