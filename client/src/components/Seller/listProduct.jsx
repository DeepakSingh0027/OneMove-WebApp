import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

export default function ListProduct() {
  const { role, setARole } = useContext(UserContext);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [specification, setSpecification] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [categoryDesp, setCategoryDesp] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [specificationList, setSpecificationList] = useState([]);

  const navigate = useNavigate();
  const [message, setMessage] = useState();

  // Validation functions
  const validateTitle = (title) => {
    if (!title) return "Title is required.";
    return "";
  };

  const validateDescription = (description) => {
    if (!description) return "Description is required.";
    return "";
  };

  const validateSpecification = (specification) => {
    if (!specificationList) return "Specification is required.";
    return "";
  };

  const validateQuantity = (quantity) => {
    if (!quantity || quantity <= 0) return "Quantity must be greater than 0.";
    return "";
  };

  const validateCategory = (category) => {
    if (!category) return "Category is required.";
    return "";
  };

  const validateCategoryDescription = (categoryDesp) => {
    if (!categoryDesp) return "Category description is required.";
    return "";
  };

  const validateImage = (image) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!image) return "Please upload an image.";
    if (!allowedFileTypes.includes(image.type))
      return "Only JPG, JPEG, and PNG files are allowed.";
    if (image.size > maxFileSize) return "File size should not exceed 5MB.";

    return "";
  };

  const validatePrice = (price) => {
    if (!price || price <= 0) return "Price must be greater than 0.";
    return "";
  };

  // Form submission
  const List = async (e) => {
    setMessage("");

    // Validations
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);
    const specificationError = validateSpecification(specification);
    const quantityError = validateQuantity(quantity);
    const categoryError = validateCategory(category);
    const categoryDespError = validateCategoryDescription(categoryDesp);
    const imageError = validateImage(image);
    const priceError = validatePrice(price);

    if (
      titleError ||
      descriptionError ||
      specificationError ||
      quantityError ||
      categoryError ||
      categoryDespError ||
      imageError ||
      priceError
    ) {
      setMessage(
        titleError ||
          descriptionError ||
          specificationError ||
          quantityError ||
          categoryError ||
          categoryDespError ||
          imageError ||
          priceError
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("specifications", specificationList);
    formData.append("quantity", quantity);
    formData.append("categoryName", category);
    formData.append("categoryDescription", categoryDesp);
    formData.append("image", image);
    formData.append("price", price);

    console.log("Form Data to Send:", Object.fromEntries(formData.entries()));

    try {
      const responseData = await axios.post(
        "http://localhost:9000/api/v1/products/list-product",
        formData,
        {
          withCredentials: true,
        }
      );

      if (!responseData.data.success) {
        throw "problem occurred";
      }
      setMessage(
        "Your Product has been listed, you are now redirecting to Dashboard after 3sec.."
      );
      setTimeout(() => {
        navigate("/Dashboard");
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessage("Product Listing Failed try again> ");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  //Handle Plus
  const handlePlus = (e) => {
    e.preventDefault();
    setSpecificationList((prev) => [...prev, specification]);
    setSpecification("");
  };

  // Handle image file change
  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-10">
      <div className="text-center w-full max-w-[600px]">
        {message && (
          <div className="text-xl bg-red-100 text-red-600 p-3 mb-5 rounded-lg ">
            {message}
          </div>
        )}
        <form
          className="w-full p-10 rounded-xl transition-all"
          onSubmit={(e) => {
            e.preventDefault();
            List();
          }}
        >
          <h2 className="text-4xl font-bold mb-8 text-[#41290c]">
            List Your Product
          </h2>

          {/* Title Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=" "
              className="input-field"
              required
            />
            <label className="input-label">Title</label>
          </div>

          {/* Description Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              className="input-field"
              required
            />
            <label className="input-label">Description</label>
          </div>

          {/* Specification Input */}
          <div className="relative mb-6 flex">
            <input
              type="text"
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              placeholder=" "
              className="input-field"
            />
            <label className="input-label">Specification</label>
            <p
              onClick={handlePlus}
              className="text-[#8c4313] pl-2 text-5xl cursor-pointer"
            >
              &#43;
            </p>
          </div>

          {/* Quantity Input */}
          <div className="relative mb-6">
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setMessage("Quantity cannot be Negative.");
                  setTimeout(() => setMessage(""), 3000);
                  setQuantity(0);
                } else {
                  setQuantity(e.target.value);
                }
              }}
              placeholder=" "
              className="input-field"
              required
            />
            <label className="input-label">Quantity</label>
          </div>

          {/* Category Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder=" "
              className="input-field"
              required
            />
            <label className="input-label">Category</label>
          </div>

          {/* Category Description Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={categoryDesp}
              onChange={(e) => setCategoryDesp(e.target.value)}
              placeholder=" "
              className="input-field"
            />
            <label className="input-label">Category Description</label>
          </div>

          {/* Image File Input */}
          <div className="relative mb-6">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageFileChange}
              className="input-file"
              required
            />
          </div>

          {/* Price Input */}
          <div className="relative mb-6">
            <input
              type="number"
              value={price}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setMessage("Price cannot be Negative.");
                  setTimeout(() => setMessage(""), 3000);
                  setPrice(0);
                } else {
                  setPrice(e.target.value);
                }
              }}
              placeholder=" "
              className="input-field"
            />
            <label className="input-label">Price</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#41290c] text-white py-4 rounded-full font-semibold text-lg mt-3 hover:bg-[#402718] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
          >
            List Product
          </button>
        </form>
      </div>
    </div>
  );
}
