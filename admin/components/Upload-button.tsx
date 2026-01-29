import React from "react";
import { Upload } from "lucide-react";

const UploadButton = () => {


  return (
    <button
      
      type="button"
      className="bg-brand text-white px-4 py-2 rounded-3xl flex justify-center items-center gap-3"
    >
      <Upload className="w-4 h-4" />
      <span>Upload</span>
    </button>
  );
};

export default UploadButton;
