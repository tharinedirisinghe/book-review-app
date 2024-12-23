import React from "react";

function ReviewForm({ formData, onChange, onSubmit, isEditing }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={onChange}
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        value={formData.rating}
        onChange={onChange}
        required
      />
      <textarea
        name="reviewText"
        placeholder="Write your review..."
        value={formData.reviewText}
        onChange={onChange}
        required
      />
      <button type="submit">{isEditing ? "Update" : "Submit"}</button>
    </form>
  );
}

export default ReviewForm;
