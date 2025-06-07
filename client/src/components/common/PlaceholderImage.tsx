"use client";

import Image, { ImageProps } from "next/image";

type PlaceholderImageProps = Omit<ImageProps, "onError"> & {
  className?: string;
};

export const PlaceholderImage = ({
  src,
  alt,
  className = "",
  ...props
}: PlaceholderImageProps) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ height: props.height, width: props.width }}
    >
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg"></div>
      {/* Image with error handling */}
      <Image
        src={src}
        alt={alt}
        {...props}
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
};
