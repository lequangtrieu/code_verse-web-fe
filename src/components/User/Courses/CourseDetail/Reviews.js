import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rate, Progress, Spin, message } from "antd";
import { format } from "date-fns";
import commonApi from "../../../../common/api";

const Reviews = ({ courseId }) => {
    const [loading, setLoading] = useState(true);
    const [ratingStats, setRatingStats] = useState({
        average: 0,
        totalReviews: 0,
        distribution: {},
        reviews: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(commonApi.viewCourseRating.url(courseId));
                setRatingStats(response.data);
            } catch (error) {
                console.log("xxxxxxxxxxxxx: "+ commonApi.viewCourseRating.url(courseId))
                message.error("Failed to fetch rating stats");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    if (loading) return <Spin className="mt-10" />;

    return (
        <div className="bg-white rounded-xl border p-6 mt-10 shadow-sm">
            {/* Tổng quan đánh giá */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                    <h2 className="text-5xl font-bold text-pink-600">{ratingStats.average.toFixed(1)}</h2>
                    <Rate disabled allowHalf defaultValue={ratingStats.average} />
                    <p className="text-sm text-gray-500 mt-1">
                        ({ratingStats.totalReviews} Reviews)
                    </p>
                </div>

                {/* Phân phối sao */}
                <div className="md:col-span-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2 mb-2">
                            <span className="w-6 text-sm">{star}★</span>
                            <Progress
                                percent={
                                    ratingStats.totalReviews
                                        ? ((ratingStats.distribution?.[star] || 0) / ratingStats.totalReviews) * 100
                                        : 0
                                }
                                showInfo={false}
                                strokeColor="#ec4899"
                                trailColor="#e5e7eb"
                                className="flex-1"
                            />
                            <span className="text-sm text-gray-500 w-6 text-right">
                {ratingStats.distribution?.[star] || 0}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Customer Reviews */}
            <h3 className="text-lg font-semibold border-b mt-8 pb-2 text-pink-600">Customer Reviews</h3>

            <div className="mt-4 space-y-6">
                {ratingStats.reviews.map((review, idx) => (
                    <div key={idx} className="flex gap-4 items-start border-b pb-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden">
                            <img
                                src={review.userAvatar}
                                alt={review.username}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{review.username}</p>
                                    <Rate
                                        disabled
                                        defaultValue={review.rating}
                                        className="text-pink-500 text-sm"
                                    />
                                </div>
                                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 whitespace-nowrap">
                  {format(new Date(review.createdAt), "MMMM d, yyyy")}
                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
