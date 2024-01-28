import React, { useEffect, useState } from "react";
const ImageSchema = require("../models/image")
import cloudinary from "cloudinary"
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const uploadImage = () =>{
  const [file,setFile] = useState(null)
  const [url,setUrl] = useState('')
  const [uploadError, setUploadError] = useState(null);

  const uploadImage = async () => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "assil elabed"); // Assuming preset name is correct

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmv4km71s/upload",
        form
      )
    .then(result=>{setUrl(result.data.secure_url)})
      const updatedUser = {
        ...user,
        profilePicture: response.data.secure_url,
      };

      setUploadError(null);
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
    }
  };

  const saveObject = ()=>{
    
  }

}