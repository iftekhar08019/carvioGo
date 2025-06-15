import React from "react";
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";

const CarCard = ({ 
  recipe
}) => {
const navigate = useNavigate();
const { _id: recipeId, title, cuisineType, likeCount, image } = recipe || {};

return (
    <div className="card bg-base-100 w-80 shadow-sm transition-transform duration-300 hover:scale-110 mt-6 ">
        <figure className="px-10 pt-10">
            <img
                src={image || "https://via.placeholder.com/384x216?text=No+Image"}
                alt={title || "Recipe Image"}
                className="rounded-xl object-cover w-full h-48"
            />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">{title || "Recipe Title"}</h2>
            <p className="text-sm text-gray-600">{cuisineType || "Cuisine Type"}</p>
            
            <div className="flex items-center gap-2 text-red-600 mt-2">
                <FaHeart />
                <span>{likeCount ?? 0}</span>
            </div>

            <div className="card-actions mt-4">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/recipes/${recipeId}`)}
                >
                    View Details
                </button>
            </div>
        </div>
    </div>
);
};

export default CarCard;
