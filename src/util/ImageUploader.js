import React, { useState } from "react";

const ImageUploader = ({ onImageConverted }) => {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String); // Optional: show preview
        onImageConverted(base64String); // Send base64 to parent or next step
      };

      reader.readAsDataURL(file); // Convert to base64
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {preview && (
        <img
          src={preview}
          alt="Uploaded preview"
          style={{ width: "200px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
