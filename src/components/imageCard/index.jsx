import { useState } from "react";
import { Button } from "../buttons";
import { RxCross2 } from "react-icons/rx";
import client from "../../redux/axios-baseurl";
import { useDispatch, useSelector } from "react-redux";
// import { removeProductImage } from "../../redux/slices/utillitySlice";
import { ImSpinner6 } from "react-icons/im";

function ImageCard({ index, image, handleDelete }) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const deleteImage = async (publicId, index) => {
    setIsLoading(true);
    try {
      const response = await client.delete(`/image/delete?id=${publicId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      handleDelete(index);
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-48 h-24 flex justify-center items-center relative border rounded-lg">
      <img className="w-full h-full object-center object-contain" key={index} src={image?.url}></img>
      <Button
        key={index}
        className="absolute top-1 right-1"
        type={"button"}
        onClick={() => {
          deleteImage(image?.publicId, index);
        }}
      >
        {isLoading ? (
          <ImSpinner6 className="text-black animate-spin" />
        ) : (
          <RxCross2 className="text-black" />
        )}
      </Button>
    </div>
  );
}

export default ImageCard;
