import { cn } from "@/lib/utils";

interface TagTitleProps {
  title: string;
  tag: string;
  theme?: "light" | "dark";
}

export default function TagTitle({
  tag,
  title,
  theme = "dark",
}: TagTitleProps) {
  const dotClass = theme === "light" ? "bg-stone-600" : "bg-stone-200";
  const themeClass =
    theme === "light"
      ? "from-stone-200 to-stone-300 border-stone-300"
      : "from-stone-600 to-stone-700 border-stone-700";
  return (
    <span className="flex flex-col items-start gap-5">
      <span
        className={cn(
          "flex items-center justify-center gap-1.5 rounded-xl border bg-linear-to-t px-2.5 py-1 font-mono text-xs tracking-wide",
          themeClass
        )}
      >
        <div className={cn("size-1.5 rounded-full", dotClass)} />
        {tag}
      </span>
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">{title}</h2>
    </span>
  );
}
