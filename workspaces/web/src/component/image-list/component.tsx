interface ImagesProps {
  imageURLs: string[];
}

export function ImageList({ imageURLs }: ImagesProps) {
  return (
    <div className="image list">
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
