import React from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
    const location = useLocation();
    const orderDetails = location.state || {}

    console.log("inside payment", orderDetails)

    return (
        <div className="payment">

            <div>
                <h2 className="text-center">Payment Status</h2>
                <div className="flex flex-row justify-center gap-4">
                    <button className="cursor-pointer rounded-md p-3 bg-gray-300">Failed</button>
                    <button className="cursor-pointer rounded-md p-3 bg-gray-300">Succeeded</button>
                </div>
            </div>

        </div>
    )

}

export default Payment;