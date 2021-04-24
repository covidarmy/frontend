
export const Dashboard = () =>{
    return(
        <div className='justify-center mt-3'>
            <div className="grid lg:grid-cols-2 sm:grid-col-1 gap-4 m-8 p-8">
                <div className="grid rounded-lg grid-col-1 gap-4">
                    <div className='shadow-lg box-border h-48 w-100% p-6'>
                        <div className='flex'>
                            <svg className='mt-1' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" fill="#4F46EF"/>
                                <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" fill="#4F46EF" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p className='text-strong ml-1 font-bold'>Choose Your Location</p>
                        </div>
                        <div className="pt-2 flex justify-start relative text-gray-600">
                            <input className="border-2 relative w-600 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
                            <button type="submit" className="relative mt-0" style={{right:"30px"}}>
                                <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966">
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button>
                        </div>    
                    </div>
                    <div className='shadow-lg text-center box-border h-48 w-100% p-6'>
                        2
                    </div>
                </div>
                <div className=" shadow-lg text-center box-border h-98 w-100% p-6">
                    3
                </div>
            </div>
        </div>
    )
}