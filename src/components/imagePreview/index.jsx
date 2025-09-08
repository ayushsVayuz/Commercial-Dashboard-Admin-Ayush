import ImageCard from "../imageCard";

function ImagePreview({ images, handleDelete }) {
  return (
    <div className="flex flex-wrap gap-4">
      {images?.map((image, index) => {
        return (
          <ImageCard handleDelete={handleDelete} index={index} image={image} />
        );
      })}
    </div>
  );
}

export default ImagePreview;
