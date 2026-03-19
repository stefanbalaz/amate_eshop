import { Button } from "@/components/ui/primitives";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogModal } from "./dialog-modal";

const meta: Meta<typeof DialogModal> = {
  title: "Components/Feedback/DialogModal",
  component: DialogModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "full"],
    },
    confirmVariant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DialogModal>;

// Controlled wrapper with i18n support
const DialogWrapper = ({
  children,
  ...props
}: Omit<React.ComponentProps<typeof DialogModal>, "open" | "onOpenChange"> & {
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {t("components.dialog.openDialog")}
      </Button>
      <DialogModal {...props} open={open} onOpenChange={setOpen}>
        {children}
      </DialogModal>
    </>
  );
};

export const Default: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.title")}
        description={t("components.dialog.description")}
      >
        <p>{t("components.dialog.content")}</p>
      </DialogWrapper>
    );
  },
};

export const WithoutDescription: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper title={t("components.dialog.confirmAction")}>
        <p>{t("components.dialog.confirmActionContent")}</p>
      </DialogWrapper>
    );
  },
};

export const DestructiveAction: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.deleteItem")}
        description={t("components.dialog.cannotBeUndone")}
        confirmText={t("common.delete")}
        confirmVariant="destructive"
        onConfirm={() => alert(t("components.dialog.deleted"))}
      >
        <p>{t("components.dialog.deleteConfirmation")}</p>
      </DialogWrapper>
    );
  },
};

export const SmallSize: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper title={t("components.dialog.smallDialog")} size="sm">
        <p>{t("components.dialog.smallDialogContent")}</p>
      </DialogWrapper>
    );
  },
};

export const LargeSize: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.largeDialog")}
        description={t("components.dialog.largeDialogDescription")}
        size="lg"
      >
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
            vitae tincidunt nisl nunc euismod nunc.
          </p>
          <p>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </DialogWrapper>
    );
  },
};

export const ExtraLargeSize: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.extraLargeDialog")}
        description={t("components.dialog.extraLargeDialogDescription")}
        size="xl"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("components.dialog.firstName")}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder={t("components.dialog.enterFirstName")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("components.dialog.lastName")}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder={t("components.dialog.enterLastName")}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium">
              {t("components.textField.email")}
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder={t("components.dialog.enterEmail")}
            />
          </div>
        </div>
      </DialogWrapper>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          {t("components.dialog.openDialog")}
        </Button>
        <DialogModal
          open={open}
          onOpenChange={setOpen}
          title={t("components.dialog.submitForm")}
          description={t("components.dialog.submitFormDescription")}
          loading={loading}
          onConfirm={handleConfirm}
        >
          <p>{t("components.dialog.submitFormContent")}</p>
        </DialogModal>
      </>
    );
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.completeForm")}
        description={t("components.dialog.completeFormDescription")}
        confirmDisabled
      >
        <p>{t("components.dialog.confirmDisabledContent")}</p>
      </DialogWrapper>
    );
  },
};

export const CustomFooter: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.customFooter")}
        footer={
          <div className="flex justify-between w-full">
            <Button variant="ghost">{t("components.dialog.help")}</Button>
            <div className="flex gap-2">
              <Button variant="outline">
                {t("components.dialog.saveDraft")}
              </Button>
              <Button>{t("components.dialog.publish")}</Button>
            </div>
          </div>
        }
      >
        <p>{t("components.dialog.customFooterContent")}</p>
      </DialogWrapper>
    );
  },
};

export const NoFooter: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.information")}
        showCancel={false}
        showConfirm={false}
      >
        <p>{t("components.dialog.noFooterContent")}</p>
      </DialogWrapper>
    );
  },
};

export const OnlyConfirm: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.acknowledgment")}
        showCancel={false}
        confirmText={t("components.dialog.iUnderstand")}
      >
        <p>{t("components.dialog.acknowledgmentContent")}</p>
      </DialogWrapper>
    );
  },
};

export const CustomButtonText: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.saveChanges")}
        description={t("components.dialog.saveChangesDescription")}
        cancelText={t("components.dialog.discard")}
        confirmText={t("common.save")}
      >
        <p>{t("components.dialog.unsavedChangesContent")}</p>
      </DialogWrapper>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.importantNotice")}
        showCloseButton={false}
        showCancel={false}
        confirmText={t("components.dialog.iAgree")}
      >
        <p>{t("components.dialog.mustAgreeContent")}</p>
      </DialogWrapper>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <DialogWrapper
        title={t("components.dialog.editProfile")}
        description={t("components.dialog.editProfileDescription")}
        confirmText={t("components.dialog.saveChangesButton")}
        size="md"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("components.dialog.displayName")}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("components.dialog.bio")}
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              defaultValue={t("components.dialog.bioDefaultValue")}
            />
          </div>
        </div>
      </DialogWrapper>
    );
  },
};
