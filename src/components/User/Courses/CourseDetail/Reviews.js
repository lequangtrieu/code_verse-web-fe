import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rate, Progress, Spin, message, Button } from "antd";
import { format } from "date-fns";
import commonApi from "../../../../common/api";
import ReviewForm from "./ReviewForm";
import EditableReviewForm from "./EditableReviewForm";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../config/axiosInstance";

const Reviews = ({ courseId, completionPercentage }) => {
  const [userReview, setUserReview] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    totalReviews: 0,
    distribution: {},
    reviews: [],
  });

  const user = useSelector((state) => state.user.user);

  const fetchUserReview = async () => {
    try {
      const res = await axios.get(
        commonApi.courseRating.getByUser(courseId, user.id)
      );
      setUserReview(res.data);
    } catch {
      setUserReview(null);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        commonApi.courseRating.getByCourse(courseId)
      );
      setRatingStats(response.data);
    } catch (error) {
      message.error("Failed to fetch rating stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (completionPercentage === 100 && user?.id) {
      fetchUserReview();
    }
  }, [courseId, user, completionPercentage]);

  const handleReviewUpdated = async () => {
    setEditingReviewId(null);
    await fetchUserReview();
    await fetchData();
  };

  const handleReport = (review) => {
    message.info(`Reporting review by ${review.username}...`);
  };

  if (loading) return <Spin className="mt-10" />;

  return (
    <div className="bg-white rounded-xl border p-6 mt-10 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-pink-600">
            {ratingStats.average.toFixed(1)}
          </h2>
          <Rate disabled allowHalf value={ratingStats.average} />
          <p className="text-sm text-gray-500 mt-1">
            ({ratingStats.totalReviews} Reviews)
          </p>
        </div>

        <div className="md:col-span-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 mb-2">
              <span className="w-6 text-sm">{star}★</span>
              <Progress
                percent={
                  ratingStats.totalReviews
                    ? ((ratingStats.distribution?.[star] || 0) /
                        ratingStats.totalReviews) *
                      100
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

      <h3 className="text-lg font-semibold border-b mt-8 pb-2 text-pink-600">
        Customer Reviews
      </h3>

      <div className="mt-4 space-y-6">
        {ratingStats.reviews.map((review) => {
          const isOwnReview = review.username === user?.username;
          const isEditing = editingReviewId === review.username;

          return (
            <div
              key={review.id}
              className="flex gap-4 items-start border-b pb-4"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src={review.userAvatar}
                  alt={review.username}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <p className="font-semibold">{review.username}</p>

                    <div className="w-full">
                      {isEditing ? (
                        <EditableReviewForm
                          review={review}
                          courseId={courseId}
                          onCancel={() => setEditingReviewId(null)}
                          onSuccess={handleReviewUpdated}
                        />
                      ) : (
                        <Rate
                          disabled
                          value={review.rating}
                          className="text-pink-500 text-sm"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 whitespace-nowrap">
                      {format(new Date(review.createdAt), "MMMM d, yyyy")}
                    </span>

                    {isOwnReview && !isEditing && (
                      <Button
                        size="small"
                        onClick={() => setEditingReviewId(review.username)}
                      >
                        Edit
                      </Button>
                    )}

                    {!isOwnReview && (
                      <Button
                        danger
                        size="small"
                        onClick={() => handleReport(review)}
                      >
                        Report
                      </Button>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {completionPercentage === 100 && !userReview && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-pink-600 mb-4">
            Submit your review
          </h3>
          <ReviewForm courseId={courseId} onSuccess={handleReviewUpdated} />
        </div>
      )}
    </div>
  );
};

export default Reviews;
