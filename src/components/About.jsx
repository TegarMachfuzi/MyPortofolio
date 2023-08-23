import React from 'react'

const About = () => {
  return (
    <div name="about" className='w-full h-screen bg-gradient-to-b from-gray-800
    to-black text-white'>
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
            <p className='text-4xl font-bold inline border-b-4 border-gray-500'>About</p>
        </div>

        <p className='text-xl mt-20'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Ex sint aperiam optio accusantium velit a, voluptates est in ipsa beatae, exercitationem,
            minima reiciendis. Fugiat praesentium dolor saepe ut, error aspernatur. 
            Ipsam pariatur illum tempora sed ipsa magnam distinctio totam minima ea voluptates,
            natus dolorem qui nesciunt veritatis provident a iure?
        </p>

        <br />

        <p className='text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ad aspernatur illum, 
            dolorum blanditiis ex distinctio dignissimos omnis repellendus? 
            Aliquid ratione sequi voluptate officiis nobis veniam et maxime commodi, 
            reprehenderit, harum illo ipsa eius. 
            Eos assumenda odio incidunt vitae a commodi dolores, id saepe, ullam quos consectetur 
            adipisci nemo perspiciatis.
        </p>
      </div>
    </div>
  )
}

export default About
