export type LoadingStateVariant = "inline" | "page" | "overlay" | "table";

export type LoadingStateProps = {
  label?: string;
  variant?: LoadingStateVariant;
  className?: string;
};
