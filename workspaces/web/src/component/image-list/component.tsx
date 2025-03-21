interface ImageListProps {
  imageURLs: string[];
}

export function ImageList({ imageURLs }: ImageListProps) {
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
