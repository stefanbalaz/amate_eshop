import type { Meta, StoryFn } from "@storybook/react-vite";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AlertMessage } from "./alert-message";

const meta: Meta<typeof AlertMessage> = {
  title: "Components/Feedback/AlertMessage",
  component: AlertMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
    dismissible: {
      control: { type: "boolean" },
    },
    hideIcon: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type StoryArgs = {
  variant?: "info" | "success" | "warning" | "error";
  dismissible?: boolean;
  hideIcon?: boolean;
  title?: string;
  children?: string;
};

export const Info: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.infoTitle")}
      variant={args.variant ?? "info"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon}
    >
      {args.children || t("components.alert.infoMessage")}
    </AlertMessage>
  );
};
Info.args = {
  title: "Information",
  children: "This is an informational message.",
  variant: "info",
};

export const Success: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.successTitle")}
      variant={args.variant ?? "success"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon}
    >
      {args.children || t("components.alert.successMessage")}
    </AlertMessage>
  );
};
Success.args = {
  title: "Success",
  children: "Your action was completed successfully.",
  variant: "success",
};

export const Warning: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.warningTitle")}
      variant={args.variant ?? "warning"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon}
    >
      {args.children || t("components.alert.warningMessage")}
    </AlertMessage>
  );
};
Warning.args = {
  title: "Warning",
  children: "Please review before proceeding.",
  variant: "warning",
};

export const Error: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.errorTitle")}
      variant={args.variant ?? "error"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon}
    >
      {args.children || t("components.alert.errorMessage")}
    </AlertMessage>
  );
};
Error.args = {
  title: "Error",
  children: "Something went wrong. Please try again.",
  variant: "error",
};

export const Dismissible: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.dismissibleTitle")}
      variant={args.variant ?? "info"}
      dismissible={args.dismissible ?? true}
      hideIcon={args.hideIcon}
      onDismiss={() => console.log("Dismissed!")}
    >
      {args.children || t("components.alert.dismissibleMessage")}
    </AlertMessage>
  );
};
Dismissible.args = {
  title: "Dismissible Alert",
  children: "Click the X to dismiss this alert.",
  variant: "info",
  dismissible: true,
};

export const WithAction: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.updateTitle")}
      variant={args.variant ?? "info"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon}
      action={{
        label: t("components.alert.updateNow"),
        onClick: () => alert("Updating..."),
      }}
    >
      {args.children || t("components.alert.updateMessage")}
    </AlertMessage>
  );
};
WithAction.args = {
  title: "Update Available",
  children: "A new version is available.",
  variant: "info",
};

export const WithCustomIcon: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.customIconTitle")}
      variant={args.variant ?? "warning"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon}
      icon={<Zap className="h-5 w-5 text-yellow-600" />}
    >
      {args.children || t("components.alert.customIconMessage")}
    </AlertMessage>
  );
};
WithCustomIcon.args = {
  title: "Custom Icon",
  children: "This alert has a custom icon.",
  variant: "warning",
};

export const WithoutIcon: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.noIconTitle")}
      variant={args.variant ?? "info"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon ?? true}
    >
      {args.children || t("components.alert.noIconMessage")}
    </AlertMessage>
  );
};
WithoutIcon.args = {
  title: "No Icon",
  children: "This alert has no icon.",
  variant: "info",
  hideIcon: true,
};

export const WithoutTitle: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      variant={args.variant ?? "success"}
      dismissible={args.dismissible}
      hideIcon={args.hideIcon}
    >
      {args.children || t("components.alert.noTitleMessage")}
    </AlertMessage>
  );
};
WithoutTitle.args = {
  children: "This alert has no title.",
  variant: "success",
};

export const LongContent: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.longContentTitle")}
      variant={args.variant ?? "info"}
      dismissible={args.dismissible ?? true}
      hideIcon={args.hideIcon}
    >
      {args.children || t("components.alert.longContentMessage")}
    </AlertMessage>
  );
};
LongContent.args = {
  title: "Long Content",
  children:
    "This is a longer message that demonstrates how the alert handles multiple lines of text. It wraps nicely within the container.",
  variant: "info",
  dismissible: true,
};

export const AllVariants: StoryFn<StoryArgs> = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <AlertMessage title={t("components.alert.infoTitle")} variant="info">
        {t("components.alert.infoMessage")}
      </AlertMessage>
      <AlertMessage
        title={t("components.alert.successTitle")}
        variant="success"
      >
        {t("components.alert.successMessage")}
      </AlertMessage>
      <AlertMessage
        title={t("components.alert.warningTitle")}
        variant="warning"
      >
        {t("components.alert.warningMessage")}
      </AlertMessage>
      <AlertMessage title={t("components.alert.errorTitle")} variant="error">
        {t("components.alert.errorMessage")}
      </AlertMessage>
    </div>
  );
};

export const FullFeatured: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AlertMessage
      title={args.title || t("components.alert.sessionExpiring")}
      variant={args.variant ?? "warning"}
      dismissible={args.dismissible ?? true}
      hideIcon={args.hideIcon}
      action={{
        label: t("components.alert.extendSession"),
        onClick: () => alert("Session extended!"),
      }}
    >
      {args.children || t("components.alert.sessionExpiringMessage")}
    </AlertMessage>
  );
};
FullFeatured.args = {
  title: "Session Expiring",
  children: "Your session will expire in 5 minutes.",
  variant: "warning",
  dismissible: true,
};
