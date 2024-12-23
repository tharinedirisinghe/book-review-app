import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    reviewText: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reviews");
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form (Create or Update review)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData); // Check if the function is triggered
    try {
      if (editingId) {
        console.log("Editing review ID:", editingId);
        await axios.put(`http://localhost:5000/reviews/${editingId}`, formData);
      } else {
        console.log("Creating new review");
        await axios.post("http://localhost:5000/reviews", formData);
      }
      setFormData({ title: "", author: "", rating: "", reviewText: "" });
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      console.error("Error saving review:", err);
    }
  };

  // Handle edit action
  const handleEdit = (review) => {
    setEditingId(review.id);
    setFormData({
      title: review.title,
      author: review.author,
      rating: review.rating,
      reviewText: review.reviewText,
    });
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="App">
      <h1>Book Review Application</h1>
      <ReviewForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
        isEditing={!!editingId}
      />
      <ReviewList reviews={reviews} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
