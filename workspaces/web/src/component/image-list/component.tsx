import { useState } from "react";

interface ImageListProps {
  imageURLs: string[];
}

export function ImageList({ imageURLs }: ImageListProps) {
  const [activeKey, setActiveKey] = useState<string>("");

  return (
    <div className="image list">
      {activeKey === "" ? (
        imageURLs.map((imageURL) => {
          return (
            <figure
              key={imageURL}
              onClick={() => setActiveKey(imageURL)}
            >
              <img src={imageURL} />
            </figure>
          );
        })
      ) : (
        <dialog open={true} onClick={() => setActiveKey("")}>
          <img src={activeKey} />
          <img className="backlight" src={activeKey} />
        </dialog>
      )}
    </div>
  );
}
