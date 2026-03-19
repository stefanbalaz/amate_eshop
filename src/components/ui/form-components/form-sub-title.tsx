import { cn } from "@/utils/style";
import { Text } from "../components/text";

type BaseFormSubTitleProps = {
  text: string;
  wrapperClassName?: string;
  textClassName?: string;
};

export default function FormSubTitle({
  text,
  wrapperClassName,
  textClassName,
}: BaseFormSubTitleProps) {
  return (
    <div className={wrapperClassName ?? "pt-2 mb-8"}>
      <Text
        as="div"
        size="sm"
        className={cn(
          "uppercase font-semibold tracking-wider text-muted-foreground",
          textClassName,
        )}
      >
        {text}
      </Text>
    </div>
  );
}
