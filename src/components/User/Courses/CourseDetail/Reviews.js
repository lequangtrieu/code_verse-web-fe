import React from "react";
import { Rate } from "antd";

const Reviews = ({ reviewsData }) => {
    return (
        <div className="bg-white rounded-xl border p-4 mt-10">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">Reviews</h3>
            <div className="space-y-4">
                {reviewsData.map((review, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300">
                            <img
                                src={review.userAvatar || "https://pethelpful.com/.image/c_fill,g_faces:center/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg"}
                                alt={review.username}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{review.username}</h4>
                                <Rate disabled defaultValue={review.rating} />
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
