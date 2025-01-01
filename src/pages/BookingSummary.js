import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const paymentDetails = location.state || {};

    const totalPrice = paymentDetails.seatNumbers.reduce((total, seat) => {
        return total + parseInt(seat.price); 
    }, 0);

    const convinienceFee = totalPrice * 0.13;

    const TotalBill = (totalPrice+convinienceFee).toFixed(2);

    const proceedToPayment = () => {
        if (!paymentDetails || Object.keys(paymentDetails).length === 0) {
            console.error("paymentDetails is undefined or empty");
            return;
        }

        const orderDetails = {
            ...paymentDetails,
            amount: TotalBill
        }

        navigate("/payment", {state: orderDetails})
    }

    return (
        <div className="p-4 ">
            <h1 className="summary text-xl text-red-600 font-semibold mb-8 text-center">B O O K I N G &nbsp; S U M M A R Y</h1>
            
            <div className="lg:flex lg:gap-8">

                <div className="shadow-lg bg-gray-50 rounded-md p-6 lg:w-[40vw]">

                    <div className="flex flex-row justify-between mb-6">

                        <div className="theatre mt-14">
                            {/* <h2 className="text-md text-gray-800 font-semibold mt-2 w-[125px] mb-4">Date and Venue:</h2> */}
                            <h2 className="text-sm text-gray-800 mt-2 w-[125px] -mb-2">{paymentDetails.theaterName}</h2>
                            <h2 className="text-sm text-gray-800 mt-2 w-[125px]">{paymentDetails.screenName}</h2>
                            <h2 className="text-sm text-gray-600 mt-2 w-[125px] mt-4 -mb-2">
                            ShowTime:
                            </h2>
                            <h2 className="text-sm text-gray-600 mt-2 w-[125px] -mb-2">
                            {new Date(paymentDetails.showTime)
                            .toLocaleDateString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false, // Use 24-hour format
                            })}</h2>

                        </div>

                        <div className="movie">
                            <img src={paymentDetails.posterUrl} alt={paymentDetails.movieName} width={145} height={160}/>
                            <h2 className="text-md text-gray-600 mt-2 w-[125px]">{paymentDetails.movieName}</h2>
                        </div>
                    </div>
                
                    <div className="flex flex-row justify-between mb-6 mt-8">
                        <div className="md:flex md:flex-row">
                            <div className="flex flex-row">
                                <h2 className="text-md text-gray-800 font-normal">Seats - &nbsp;</h2>
                                <ul className="flex flex-row">
                                    {paymentDetails.seatNumbers.map((each)=>(
                                        <li className="font-normal text-gray-800 text-md">
                                            {each.seat_number},&nbsp;
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <h2 className="text-md text-gray-800 font-normal">{`( ${paymentDetails.seatNumbers.length} tickets )`}</h2> 
                        </div>

                        <div className="payment">
                                <h2 className="text-md text-gray-800 font-normal">Rs. {totalPrice.toFixed(2)}</h2>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div>
                            <h2 className="text-md text-gray-800 font-normal">Convinience fee &nbsp;</h2>
                            <h2 className="text-xs text-gray-500 font-normal">Booking Charges &nbsp;+&nbsp; GST{`(18%)`}</h2>
                        </div>
                        <h2 className="text-md text-gray-800 font-normal">Rs. {convinienceFee.toFixed(2)}</h2>
                    </div>

                    <hr className="mt-6"/>

                    <div className="flex flex-row justify-between mt-4">
                        <div>
                            <h2 className="text-md text-gray-800 font-normal">Subtotal &nbsp;</h2>
                        </div>
                        <h2 className="text-md text-gray-800 font-normal">Rs. {(totalPrice+convinienceFee).toFixed(2)}</h2>
                    </div>

                </div>

                <div className="flex flex-col items-center mt-12 self-end">
                    <h4 className="text-gray-400 text-xs w-[200px] mb-2">By proceeding, I express my consent to complete this transaction</h4>
                    <button className="bg-red-600 text-white p-2 w-[220px] text-md rounded-md"
                    onClick={proceedToPayment}>
                            Proceed to Payment
                    </button>
                </div>

            </div>

        </div>
    )
}

export default BookingSummary;