import React from "react";

function ReviewList({ reviews, onEdit, onDelete }) {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <h2>{review.title}</h2>
          <h4>By {review.author}</h4>
          <p>Rating: {review.rating} ⭐</p>
          <p>{review.reviewText}</p>
          <p>Date: {review.dateAdded}</p>
          <button onClick={() => onEdit(review)}>Edit</button>
          <button onClick={() => onDelete(review.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
