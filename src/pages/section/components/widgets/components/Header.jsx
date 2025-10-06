import React from 'react'
import { CalendarTodayOutlined as CalendarTodayOutlinedIcon, FileDownloadOutlined as FileDownloadOutlinedIcon } from "@mui/icons-material";
import { FaChevronDown } from "react-icons/fa6";
function Header({ title, description }) {
    return (
        <div className="flex items-center justify-between px-6 my-6">

            <div>
                <div className="text-2xl  text-[#121212] font-semibold">{title}</div>
                <div className="text-gray-500 text-sm">
                    {description}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white shadow-sm px-2 md:px-6 py-1 rounded-sm text-[#64748B] text-sm hover:bg-slate-50">
                    <CalendarTodayOutlinedIcon  fontSize='12' />
                    <div className=' whitespace-nowrap'>Last 7 Days</div>
                    <FaChevronDown  fontSize='12' />
                </div>

                <div className="w-full flex items-center justify-center gap-2 bg-white  text-[#884EA7] px-2  md:px-6 py-1 rounded-sm shadow-sm hover:bg-purple-50">
                    <div className='font-medium whitespace-nowrap'>Export Report</div>
                    <FileDownloadOutlinedIcon  fontSize='12' />
                </div>
            </div>
        </div>
    )
}

export default Header