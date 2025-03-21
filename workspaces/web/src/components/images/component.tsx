import "./stylesheet.css";

interface ImagesProps {
  imageURLs: string[];
}

export function Images({ imageURLs }: ImagesProps) {
  return (
    <div className="images">
      {imageURLs.map((imageURL) => {
        return (
          <figure key={imageURL}>
            <img src={imageURL} />
          </figure>
        );
      })}
    </div>
  );
}
