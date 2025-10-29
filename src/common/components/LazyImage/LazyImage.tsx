import { useState } from "react";

import "./lazy-image.scss";
import { IMAGE_BASE_URL } from "@constants/common.constant";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** fallback image shown if load fails */
  fallbackSrc?: string;
  apiLoading?: boolean;
  imgClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = "",
  imgClassName = "",
  apiLoading,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  return (
    <div
      className={`lazy-image-wrapper ${
        loaded && !apiLoading ? "loaded" : "loading"
      } ${className}`}
    >
      {!error ? (
        <img
          src={src === IMAGE_BASE_URL ? undefined : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          className={`lazy-image ${imgClassName}`}
          {...rest}
        />
      ) : (
        <div className="lazy-image-fallback">
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
