import type { Meta, StoryFn } from "@storybook/react-vite";
import { Toaster } from "sonner";
import {
  UploadAttachments,
  UploadAttachmentsOverlay,
  useUploadAttachments,
  type UploadAttachment,
} from "./index";

const meta: Meta<typeof UploadAttachments> = {
  title: "Components/UploadAttachments",
  component: UploadAttachments,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster richColors position="top-center" />
      </>
    ),
  ],
  argTypes: {
    uploading: { control: { type: "boolean" } },
    uploadProgress: { control: { type: "number", min: 0, max: 100 } },
    attachButtonLabel: { control: { type: "text" } },
  },
};

export default meta;

type StoryArgs = {
  maxFiles?: number;
  maxSize?: number;
  uploading?: boolean;
  uploadProgress?: number;
  attachButtonLabel?: string;
};

const defaultArgs: StoryArgs = {
  maxFiles: 20,
  maxSize: 10_000_000,
  uploading: false,
  uploadProgress: 0,
  attachButtonLabel: "Attach",
};

function makeAttachment(
  base: { name: string; id?: string } & Partial<UploadAttachment>,
): UploadAttachment {
  const ext = base.name.split(".").pop() ?? "";
  return {
    id: base.id ?? base.name,
    name: base.name,
    type: base.type ?? "application/octet-stream",
    extension: base.extension ?? ext,
    size: base.size ?? 1024,
    preview: base.preview ?? "",
    uploadStatus: base.uploadStatus ?? false,
    uploading: base.uploading ?? false,
    processing: base.processing ?? false,
  };
}

export const Default: StoryFn<StoryArgs> = (args) => {
  const { attachments, handleFilesSelected, removeAttachment } =
    useUploadAttachments([], {
      maxFiles: args.maxFiles,
      maxSize: args.maxSize,
    });
  return (
    <div className="w-full max-w-2xl">
      <UploadAttachments
        attachments={attachments}
        onFilesSelected={handleFilesSelected}
        onRemove={removeAttachment}
        uploading={args.uploading ?? false}
        uploadProgress={args.uploadProgress ?? 0}
        attachButtonLabel={args.attachButtonLabel}
      />
    </div>
  );
};
Default.args = defaultArgs;

export const MultiFiles: StoryFn<StoryArgs> = (args) => {
  const initial = [
    makeAttachment({
      name: "report.pdf",
      type: "application/pdf",
      uploadStatus: true,
    }),
    makeAttachment({
      name: "sheet.xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      uploadStatus: true,
    }),
    makeAttachment({
      name: "notes.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      uploadStatus: true,
    }),
    makeAttachment({
      name: "image.png",
      type: "image/png",
      uploadStatus: true,
    }),
    makeAttachment({
      name: "backup.zip",
      type: "application/zip",
      uploadStatus: true,
    }),
  ];
  const { attachments, handleFilesSelected, removeAttachment } =
    useUploadAttachments(initial, {
      maxFiles: args.maxFiles,
      maxSize: args.maxSize,
    });
  return (
    <div className="w-full max-w-2xl">
      <UploadAttachments
        attachments={attachments}
        onFilesSelected={handleFilesSelected}
        onRemove={removeAttachment}
        uploading={args.uploading ?? false}
        uploadProgress={args.uploadProgress ?? 0}
        attachButtonLabel={args.attachButtonLabel}
      />
    </div>
  );
};
MultiFiles.args = defaultArgs;

export const WithExistingAttachments: StoryFn<StoryArgs> = (args) => {
  const initial = [
    makeAttachment({
      name: "sample.pdf",
      type: "application/pdf",
      uploadStatus: true,
    }),
  ];
  const { attachments, handleFilesSelected, removeAttachment } =
    useUploadAttachments(initial, {
      maxFiles: args.maxFiles,
      maxSize: args.maxSize,
    });
  return (
    <div className="w-full max-w-2xl">
      <UploadAttachments
        attachments={attachments}
        onFilesSelected={handleFilesSelected}
        onRemove={removeAttachment}
        uploading={args.uploading ?? false}
        uploadProgress={args.uploadProgress ?? 0}
        attachButtonLabel={args.attachButtonLabel}
      />
    </div>
  );
};
WithExistingAttachments.args = defaultArgs;

export const Uploading: StoryFn<StoryArgs> = (args) => {
  const { attachments, handleFilesSelected, removeAttachment } =
    useUploadAttachments([], {
      maxFiles: args.maxFiles,
      maxSize: args.maxSize,
    });
  return (
    <div className="w-full max-w-2xl">
      <UploadAttachments
        attachments={attachments}
        onFilesSelected={handleFilesSelected}
        onRemove={removeAttachment}
        uploading={true}
        uploadProgress={args.uploadProgress ?? 45}
        attachButtonLabel={args.attachButtonLabel}
      />
    </div>
  );
};
Uploading.args = { ...defaultArgs, uploadProgress: 45 };

export const UploadingWithFiles: StoryFn<StoryArgs> = (args) => {
  const initial = [
    makeAttachment({
      name: "document.pdf",
      type: "application/pdf",
      uploadStatus: false,
      uploading: true,
    }),
  ];
  const { attachments, handleFilesSelected, removeAttachment } =
    useUploadAttachments(initial, {
      maxFiles: args.maxFiles,
      maxSize: args.maxSize,
    });
  return (
    <div className="w-full max-w-2xl">
      <UploadAttachments
        attachments={attachments}
        onFilesSelected={handleFilesSelected}
        onRemove={removeAttachment}
        uploading={true}
        uploadProgress={args.uploadProgress ?? 65}
        attachButtonLabel={args.attachButtonLabel}
      />
    </div>
  );
};
UploadingWithFiles.args = { ...defaultArgs, uploadProgress: 65 };

export const Processing: StoryFn<StoryArgs> = (args) => {
  const initial = [
    makeAttachment({
      name: "scan.pdf",
      type: "application/pdf",
      uploadStatus: false,
      uploading: false,
      processing: true,
    }),
    makeAttachment({
      name: "photo.jpg",
      type: "image/jpeg",
      uploadStatus: false,
      uploading: false,
      processing: true,
    }),
  ];
  const { attachments, handleFilesSelected, removeAttachment } =
    useUploadAttachments(initial, {
      maxFiles: args.maxFiles,
      maxSize: args.maxSize,
    });
  return (
    <div className="w-full max-w-2xl">
      <UploadAttachments
        attachments={attachments}
        onFilesSelected={handleFilesSelected}
        onRemove={removeAttachment}
        uploading={false}
        uploadProgress={0}
        attachButtonLabel={args.attachButtonLabel}
      />
    </div>
  );
};
Processing.args = defaultArgs;

export const Overlay: StoryFn<{
  uploading?: boolean;
  dragActiveText?: string;
}> = (args) => {
  const { handleFilesSelected, canAddMore } = useUploadAttachments([], {
    maxFiles: 20,
    maxSize: 10_000_000,
  });
  return (
    <div className="w-full max-w-2xl">
      <UploadAttachmentsOverlay
        onFilesSelected={handleFilesSelected}
        uploading={args.uploading ?? false}
        canAddMore={canAddMore}
        dragActiveText={args.dragActiveText}
      >
        <div className="min-h-[200px] rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground text-sm">
          Drop files here. This area accepts drag-and-drop when under the file
          limit.
        </div>
      </UploadAttachmentsOverlay>
    </div>
  );
};
Overlay.args = { uploading: false, dragActiveText: "Attach files" };
