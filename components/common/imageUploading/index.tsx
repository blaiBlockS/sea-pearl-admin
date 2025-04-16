import { useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";

interface ImageUploadingBoxProps {
  images: ImageType[];
  onChange: (imageList: ImageListType, addUpdateIndex?: number[]) => void;
}

const ImageUploadingBox = ({ images, onChange }: ImageUploadingBoxProps) => {
  const maxNumber = 1;

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper w-full">
          <div className="flex flex-1 justify-between mb-5">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              className="text-text-secondary"
              {...dragProps}
            >
              <span className="text-text-brand/70 hover:text-text-brand">
                Click
              </span>{" "}
              or Drop here
            </button>

            <button onClick={onImageRemoveAll} className="text-text-secondary">
              Remove all images
            </button>
          </div>

          {imageList.map((image, index) => (
            <div key={index} className="image-item flex-1">
              <img src={image["data_url"]} alt="img" />
              <div className="image-item__btn-wrapper mt-2 flex gap-4">
                <button
                  onClick={() => onImageUpdate(index)}
                  className="py-1 text-text-secondary rounded-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => onImageRemove(index)}
                  className="py-1 text-text-secondary rounded-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploadingBox;
