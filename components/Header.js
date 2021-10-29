import Image from "next/image";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon,  } from '@heroicons/react/solid'
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";
import search from "../pages/search";
import { signIn, signOut } from "next-auth/react";



function header({placeholder}) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());  
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const resetInput = () => {
        setSearchInput("");
    };

    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            },
        });
    };
    const signIn = () => {
        router.push({
            pathname: "/auth/signIn",

        });
    };

    const SelectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };  



    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
             
            {/*LEFT SECTION OF HEADER */}
            <div onClick={() => router.push("/")} className=" relative flex items-center h-10 cursor-pointer my-auto">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" 
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                />
            </div>

            {/*CENTER OF HEADER */}
            <div className="flex items-center border-2 rounded-full py-3 md:shadow-lg">
                <input 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} 
                    type="text" 
                    placeholder={placeholder || "Start your search"} 
                    className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-500 "/> 
                <SearchIcon className=" hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            {/*RIGHT SECTION OF HEADER */}
            <div className="flex space-x-4 items-center justify-end text-gray-700">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>
                <div className="flex cursor-pointer items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-8"/>
                    <UserCircleIcon className="h-8"/>
                </div>
                <div className="grid  grid-cols-1 ">
                    <button onClick={signIn} className="hidden md:inline hover:scale-105 cursor-pointer text-red-400 font-semibold ">Sign in</button>
                    <span className="h-1"></span>
                    <button onClick={signOut} className="hidden md:inline hover:scale-105 cursor-pointer text-red-400 font-semibold ">Sign out</button>
                </div>

            </div>

            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker 
                        ranges={[SelectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold" >Number of Guests</h2>
                        <UsersIcon className="h-5" />
                        <input min={1} value={noOfGuests} onChange={e => setNoOfGuests(e.target.value)}type="number" className="w-12 pl-2 text-lg outline-none text-red-400" />
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={search} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default header;
