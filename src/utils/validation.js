import toast from "react-hot-toast";

export const handleFileValidation = (event) => {
  const selectedFile = event.target.files[0];
  // Check if a file is selected
  if (selectedFile) {
    // Check if the selected file type is an image
    if (!/^image\//.test(selectedFile.type)) {
      toast.error("Please upload an image file.");
    }
  }
};
