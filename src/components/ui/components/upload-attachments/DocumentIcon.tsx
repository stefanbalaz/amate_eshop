import * as React from "react";
import {
  FileArchive,
  FileAudio,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  File,
} from "lucide-react";
import { getDocumentIconType } from "@/utils/documents/get-document-icon-type";
import { cn } from "@/utils/style";

export interface DocumentIconProps {
  fileType: string;
  className?: string;
}

const ICON_CLASS = "size-5 shrink-0 text-muted-foreground";
type IconProps = { className?: string; "aria-hidden"?: boolean };
const iconMap: Record<string, React.ComponentType<IconProps>> = {
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  archive: FileArchive,
  excel: FileSpreadsheet,
  word: FileText,
  powerpoint: FileText,
  access: FileText,
  rtf: FileText,
  pdf: FileText,
  html: FileText,
  xml: FileText,
  script: FileText,
  executable: File,
  ebook: FileText,
  javascript: FileText,
  font: FileText,
  visio: FileText,
  calendar: FileText,
  css: FileText,
  plain: FileText,
};

export const DocumentIcon = React.memo(function DocumentIcon({
  fileType,
  className,
}: DocumentIconProps) {
  const documentIconType = getDocumentIconType(fileType);
  const iconComponent = iconMap[documentIconType] ?? File;
  return React.createElement(iconComponent, {
    className: cn(ICON_CLASS, className),
    "aria-hidden": true,
  });
});
