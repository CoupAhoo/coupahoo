type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE = {
  sm: "text-3xl sm:text-4xl",
  md: "text-[clamp(2.2rem,10vw,4.5rem)]",
  lg: "text-[clamp(2.6rem,11vw,6.2rem)]",
} as const;

export function TitleMark({ size = "lg", className }: Props) {
  return (
    <p
      className={`stroke-title wobble font-display leading-[0.9] tracking-wide ${SIZE[size]} ${className ?? ""}`}
    >
      ~ COUP AHOO ~
    </p>
  );
}
