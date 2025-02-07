import React from 'react'
import { useLocation,Link } from 'react-router-dom';
import GoBack from '../componets/GoBack';
import Sem from '../componets/sem'



const Sub = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseName = queryParams.get('course');
  
    console.log(courseName);
  
  return (
    <div className="text-center">
        <GoBack />
        <div className="bg-white p-4 w-full">
        <h1 className="text-4xl text-left font-bold">{courseName}</h1>
        <h2 className="text-3xl text-left font-bold">Collations</h2>
    </div>
    <p className="mt-4 text-left pl-3 text-lg">Select your subject</p>

    <div className='z-1 rounded-t-lg mr-2 ml-2 mt-4' >
        <div className='block shadow-[inset_1px_7px_4px_rgba(0,0,0,1)]  rounded-t-3xl'>
            <div className='-z-1 ml-2 p-4 mr-2 rounded-t-lg flex  overflow-x-scroll gap-6' >
                <Sem s={1} />
                <Sem s={2} />
                <Sem s={3} />
                <Sem s={4} />
                <Sem s={5} />
                <Sem s={6} />
            </div>
     
    


            <div className="mt-6 space-y-4 p-4">
                <Link  to={`/ns?sub=datastructure`}>
                <div className="flex items-center p-4 bg-gray-200 rounded-full shadow-md">
                    <img src="https://placehold.co/50x50" alt="Icon for Data Structure & Algorithm" className="rounded-lg w-12 h-12 mr-4"/>

                    <span className="text-lg font-medium">Data Structure & Algorithm</span>
                </div>
                    </Link>
                <div className="flex items-center p-4 bg-gray-200 rounded-full shadow-md">
                    <img src="https://placehold.co/50x50" alt="Icon for Data Structure & Algorithm" className="rounded-lg w-12 h-12 mr-4"/>
                    <span className="text-lg font-medium">Data Structure & Algorithm</span>
                </div>
            
            </div>
        </div>   
    </div>
</div>
  )
}

export default Sub
