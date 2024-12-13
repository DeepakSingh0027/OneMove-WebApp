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

  const navigate = useNavigate();
  const [message, setMessage] = useState();

  //Form submittion
  const List = async (e) => {
    // Clear previous messages
    setMessage("");

    // 1️⃣ **Boundary Check for Form Inputs**
    if (!title) {
      setMessage("Title is required");
      return;
    }

    if (!description) {
      setMessage("Description is required");
      return;
    }

    if (!specification) {
      setMessage("Specification is required");
      return;
    }

    if (!quantity || quantity <= 0) {
      setMessage("Quantity is required and must be greater than 0");
      return;
    }

    if (!category) {
      setMessage("Category is required");
      return;
    }

    if (!categoryDesp) {
      setMessage("Category description is required");
      return;
    }

    if (!image) {
      setMessage("Please upload an image");
      return;
    }

    if (!price || price <= 0) {
      setMessage("Price is required and must be greater than 0");
      return;
    }

    // 2️⃣ **File Type and Size Check for Image**
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!allowedFileTypes.includes(image.type)) {
      setMessage("Only JPG, JPEG, and PNG files are allowed");
      return;
    }

    if (image.size > maxFileSize) {
      setMessage("File size should not exceed 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("specifications", specification);
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-2xl ">{message}</div>
        <form
          className="max-w-[300px] p-5 bg-white rounded-lg shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            List();
          }}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full h-[40px] my-3 px-3 border border-[#fea069] rounded"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full h-[40px] my-3 px-3 border border-[#fea069] rounded"
            required
          />
          <input
            type="text"
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
            placeholder="Specification"
            className="w-full h-[40px] my-3 px-3 border border-[#fea069] rounded"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              if (e.target.value < 0) {
                setMessage("Quantity cannot be Negative.");
                setTimeout(() => {
                  setMessage("");
                }, 3000);
                setQuantity(0);
              } else {
                setQuantity(e.target.value);
              }
            }}
            placeholder="Quantity"
            className="w-full h-[40px] my-3 px-3 border border-[#fea069] rounded"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full h-[40px] my-3 px-3 border border-[#fea069] rounded"
            required
          />
          <input
            type="text"
            value={categoryDesp}
            onChange={(e) => setCategoryDesp(e.target.value)}
            placeholder="Category Description"
            className="w-full h-[40px] my-3 px-3 border border-[#fea069] rounded"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageFileChange}
            className="border p-2 w-full my-3"
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => {
              if (e.target.value < 0) {
                setMessage("Price cannot be Negative.");
                setTimeout(() => {
                  setMessage("");
                }, 3000);
                setPrice(0);
              } else {
                setPrice(e.target.value);
              }
            }}
            placeholder="Price"
            className="w-full h-[40px] my-3 px-3 border border-[#fea069] rounded"
          />
          <button
            type="submit"
            className="w-full bg-[#41290c] text-white rounded-full py-3 hover:bg-[#402718] transition-all duration-300"
          >
            List
          </button>
        </form>
      </div>
    </div>
  );
}
