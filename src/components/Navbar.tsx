// @ts-ignore
import React from "react";
import { useState, useEffect } from "react";
function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const toggelDarkMode = () => {
        setDarkMode(!darkMode)
    }
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
    return (

        <nav className={`border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 ${darkMode ? 'dark' : ''}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <h2 className="text-4xl lg:font-bold sm:text-3xl md:text-2xl lg:text-2xl font-bold sm:font-medium dark:text-white">
                        Dynamic Form Generation
                    </h2>
                </a>

                <div className="ml-auto">
                <button
    type="button"
    className="flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    onClick={toggelDarkMode}
>
    <span className="mr-4 flex-shrink-0 ">
        <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <title>dark-mode</title>
            <g id="Layer_2" data-name="Layer 2">
                <g id="Icons">
                    <g>
                        <rect width="48" height="48" fill="none" />
                        <g>
                            <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z" />
                            <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </span>
    {darkMode ? 'LHT' : 'DRK'}
</button>

                </div>
            </div>
        </nav>



    )
}

export default Navbar