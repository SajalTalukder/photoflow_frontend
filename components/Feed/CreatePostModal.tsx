"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleAuthRequest } from "../utils/apiRequest";
import LoadingButton from "../Helper/LoadingButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addPost } from "@/store/postSlice";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreatePostModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Store the file
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Store preview URL
  const [caption, setCaption] = useState<string>(""); // State for the caption
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  // Reset the selected image and caption when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
      setPreviewImage(null); // Clear preview
      setCaption(""); // Clear caption
    }
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file!");
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB!");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file); // Store the file
      setPreviewImage(imageUrl); // Store the preview URL
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCreatePost = async () => {
    if (!selectedImage) {
      toast.error("Please select an image to create a post!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", selectedImage); // Append the actual file

    const createPostReq = async () =>
      axios.post(`${BASE_API_URL}/posts/create-post`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    const result = await handleAuthRequest(createPostReq, setIsLoading);

    if (result) {
      dispatch(addPost(result.data.data.post));
      toast.success("Post created successfully!");
      setSelectedImage(null); // Reset the image
      setPreviewImage(null); // Reset preview
      setCaption(""); // Reset the caption
      onClose(); // Close the modal
      router.push("/");
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {previewImage ? (
          // Only show the selected image and input for caption when an image is chosen
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="mt-4">
              <Image
                src={previewImage}
                alt="Preview"
                width={400}
                height={400}
                className="overflow-auto max-h-96 rounded-md object-contain w-full"
              />
            </div>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)} // Update the caption state
              placeholder="Write a caption..."
              className="mt-4 p-2 border rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex space-x-4 mt-4">
              <LoadingButton
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleCreatePost}
                isLoading={isLoading}
              >
                Create Post
              </LoadingButton>
              <Button
                className="bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewImage(null); // Clear preview on cancel
                  setCaption(""); // Clear caption on cancel
                  onClose();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          // Default view before an image is selected
          <>
            <DialogHeader>
              <DialogTitle className="text-center mt-3 mb-3">
                Upload Photo
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex space-x-2 text-gray-600">
                <ImageIcon size={40} />
              </div>
              <p className="text-gray-600 mt-4">
                Select a photo from your computer
              </p>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleButtonClick}
              >
                Select from computer
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
