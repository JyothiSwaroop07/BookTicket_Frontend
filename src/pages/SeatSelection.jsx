import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSeatsByShow } from "../services/api";

const SeatSelection = () => {
    const { showId } = useParams();
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState({
        movie_name: "",
        poster_url: "",
        screen_name: "",
        start_time: "",
        theatre_name: "",
    });

    useEffect(() => {
        const getSeats = async () => {
            try {
                const response = await fetchSeatsByShow(showId);
                console.log("API Response:", response);

                if (response && Array.isArray(response.data.seats)) {
                    setSeats(response.data.seats);
                    setMovieDetails(response.data.movie_details || {});
                } else {
                    console.error("Seats data is missing or not an array");
                }
            } catch (error) {
                console.error("Error fetching seats:", error);
            } finally {
                setLoading(false);
            }
        };
        getSeats();
    }, [showId]);

    const handleSeatClick = (seat) => {
        if (seat.status === "available") {
            setSelectedSeats((prevSelected) =>
                prevSelected.includes(seat)
                    ? prevSelected.filter((s) => s.seat_id !== seat.seat_id)
                    : [...prevSelected, seat]
            );
        }
    };

    const proceedToPayment = () => {
        if (!movieDetails || Object.keys(movieDetails).length === 0) {
            console.error("movieDetails is undefined or empty");
            return;
        }

        const paymentDetails = {
            theaterName: movieDetails.theatre_name || "N/A",
            showTime: movieDetails.start_time || "N/A",
            screenName: movieDetails.screen_name || "N/A",
            seatNumbers: selectedSeats,
            movieName: movieDetails.movie_name || "N/A",
            posterUrl: movieDetails.poster_url || "",
        };

        console.log("proceed to payment clicked", paymentDetails);
        navigate("/payment", { state: paymentDetails });
    };

    const organizeSeats = (seats) => {
        const categories = {};
        if (!Array.isArray(seats) || seats.length === 0) {
            console.error("Invalid seats data:", seats);
            return categories;
        }

        seats.forEach((seat) => {
            if (!categories[seat.category]) {
                categories[seat.category] = [];
            }
            categories[seat.category].push(seat);
        });

        return categories;
    };

    const renderSeats = (seatsByCategory) => {
        return Object.keys(seatsByCategory).map((category) => {
            const categorySeats = seatsByCategory[category];
            const rows = {};

            categorySeats.forEach((seat) => {
                const row = seat.seat_number[0];
                if (!rows[row]) {
                    rows[row] = [];
                }
                rows[row].push(seat);
            });

            return (
                <div key={category} className="w-full mb-4">
                    <div className="top-0 bg-white z-10">
                        <h3 className="text-sm md:text-xl font-semibold">
                            {category.charAt(0).toUpperCase() + category.slice(1)} - ₹{categorySeats[0].price}
                        </h3>
                        <hr className="my-2" />
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="sticky left-0 top-0 bg-white z-20 w-[50px]">
                                {Object.keys(rows).map((row) => (
                                    <div key={row} className="text-[11px] text-gray-600 p-[5px]">
                                        {row}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col pl-16">
                                {Object.keys(rows).map((row) => (
                                    <div key={row} className="flex mb-2">
                                        <div className="flex">
                                            {rows[row].map((seat) => {
                                                const isAvailable = seat.status === "available";
                                                const isSelected = selectedSeats.includes(seat);

                                                return seat.seat_number !== `${row}0` ? (
                                                    <div
                                                        key={seat.seat_id}
                                                        className={`mr-2 p-1 border border-gray-500 w-[20px] md:w-[25px] h-[20px] md:h-[25px] text-center text-[10px] rounded-sm cursor-pointer hover:scale-105 ${
                                                            isAvailable
                                                                ? isSelected
                                                                    ? "bg-gray-300 text-black"
                                                                    : "text-green-700 border-green-700"
                                                                : "bg-gray-400 border-0 text-transparent"
                                                        }`}
                                                        onClick={() => handleSeatClick(seat)}
                                                    >
                                                        {isAvailable ? seat.seat_number.slice(1) : ""}
                                                    </div>
                                                ) : (
                                                    <div key={seat.seat_id} className="mr-2 w-[20px] md:w-[25px]"></div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const seatsByCategory = organizeSeats(seats);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 w-[100vw]">
            <h2 className="text-lg md:text-2xl font-bold mb-4 top-0 bg-white z-20">Select Your Seats</h2>
            <div className="overflow-x-auto scrollbar-hide">{renderSeats(seatsByCategory)}</div>
            <div className="flex flex-row justify-center md:justify-start pt-10">
                <button
                    className="bg-red-600 text-white p-2 rounded-md cursor-pointer"
                    onClick={proceedToPayment}
                    disabled={loading || selectedSeats.length === 0}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default SeatSelection;
