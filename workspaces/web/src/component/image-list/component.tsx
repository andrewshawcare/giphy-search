import { useState } from "react";

interface ImageListProps {
  imageURLs: string[];
}

export function ImageList({ imageURLs }: ImageListProps) {
  const [activeKey, setActiveKey] = useState<string>("");

  return (
    <div className="image list">
      {activeKey === "" ? null : (
        <dialog open={true} onClick={() => setActiveKey("")}>
          <img src={activeKey} />
        </dialog>
      )}
      {imageURLs.map((imageURL) => {
        return (
          <figure
            key={imageURL}
            onClick={() => setActiveKey(activeKey === imageURL ? "" : imageURL)}
          >
            <img src={imageURL} />
          </figure>
        );
      })}
    </div>
  );
}
