
import convertTime from "../../utils/convertTime";
import {BASE_URL, token} from "./../../config";
import {toast} from "react-toastify";
//import {dotenv } from "dotenv";
// dotenv.config()

// const BASE_URL = process.env.BASE_URL;


const SidePanel = (doctorId, ticketPrice, timeSlots) =>{
    const bookingHandler = async()=>{
        try {
            console.log("Doctor ID: ", doctorId);
            console.log("Base URL: ", BASE_URL);
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId.doctorId}`,{    
            method:"post",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data = await res.json();
            console.log("We called Data: ",data);
            if(!res.ok){
                throw new Error(data.message + "Please try again")
            }
            if(data.session.url){
                window.location.href = data.session.url
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold ">Ticket Price</p>
                <span className="text-16px] leading-7 lg:text-[20px] lg:leading-8 text-headingColor font-bold">{JSON.stringify(doctorId.ticketPrice)} Rupees</span>
            </div>
            <div className="mt-30px">
    <p className="text__para mt-0 font-semibold text-headingColor">Available time slots:</p>
    {doctorId.timeSlots && doctorId.timeSlots.length > 0 ? (
        <ul className="mt-3">
            {doctorId.timeSlots.map((item, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                    <p className="text-[15px] leading-6 text-textColor font-semibold">
                        {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                    </p>
                    <p className="text-[15px] leading-6 text-textColor font-semibold">
                        {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                    </p>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-[15px] leading-6 text-textColor font-semibold">Doctor is unavailable</p>
    )}
</div>

            <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">Book Appointment</button>
        </div>
    )
}

export default SidePanel;