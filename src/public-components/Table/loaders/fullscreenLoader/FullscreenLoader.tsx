import "./skeletonLoader.scss";

export interface FullscreenLoaderProps {
  height?: number | string;
  width?: number | string;
  isRounded?: boolean;
}

export const FullscreenLoader = ({
  height = 24,
  width = "100%",
  isRounded = false,
}: FullscreenLoaderProps) => {
  return (
    <div
      className="skeleton-loader"
      style={{
        height: height,
        width: width,
        borderRadius: isRounded ? Math.round(Number(height) / 2) : 5,
      }}
    />
  );
};
