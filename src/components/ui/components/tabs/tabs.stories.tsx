import type { Meta, StoryFn } from "@storybook/react-vite";
import {
  Controls,
  Primary,
  Stories,
  Title,
} from "@storybook/addon-docs/blocks";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { AppWindow, Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives";
import { Tabs } from "./tabs";
import { TabsList } from "./tabs-list";
import { Tab } from "./tab";
import { TabsContent } from "./tabs-content";

// import { Tabs, TabsList, Tab, TabsContent } from "@/ui/components/tabs";

type TabsStoryArgs = {
  orientation: "horizontal" | "vertical";
  variant: "default" | "line";
  disabled: boolean;
  scrollable: boolean;
};

const meta: Meta<TabsStoryArgs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
      source: {
        type: "code",
        transform: (_code: string, storyContext: { args?: TabsStoryArgs }) => {
          const args = storyContext.args ?? {
            orientation: "horizontal" as const,
            variant: "default" as const,
            disabled: false,
            scrollable: false,
          };
          const { orientation, variant, disabled, scrollable } = args;
          const orientationAttr =
            orientation === "vertical" ? ' orientation="vertical"' : "";
          const listAttrs = [
            variant !== "default" ? `variant="${variant}"` : "",
            scrollable ? "scrollable" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const listOpen = listAttrs ? `<TabsList ${listAttrs}>` : "<TabsList>";
          const accountTab = disabled
            ? '<Tab value="account">Account</Tab>\n    <Tab value="password" disabled>Password</Tab>'
            : '<Tab value="account">Account</Tab>\n    <Tab value="password">Password</Tab>';
          const contentWrap =
            orientation === "vertical"
              ? `  <div className="flex-1">\n    <TabsContent value="account">\n      <p className="text-muted-foreground text-sm">Account content.</p>\n    </TabsContent>\n    <TabsContent value="password">\n      <p className="text-muted-foreground text-sm">Password content.</p>\n    </TabsContent>\n  </div>`
              : `  <TabsContent value="account">\n    <p className="text-muted-foreground text-sm">Account content.</p>\n  </TabsContent>\n  <TabsContent value="password">\n    <p className="text-muted-foreground text-sm">Password content.</p>\n  </TabsContent>`;
          return `<Tabs defaultValue="account" className="w-[400px]"${orientationAttr}>
  ${listOpen}
    ${accountTab}
  </TabsList>
  ${contentWrap}
</Tabs>`;
        },
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "Tab list layout direction",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    variant: {
      control: { type: "radio" },
      options: ["default", "line"],
      description: "TabsList visual style",
      table: {
        type: { summary: '"default" | "line"' },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the second tab",
      table: {
        type: { summary: "boolean" },
      },
    },
    scrollable: {
      control: { type: "boolean" },
      description: "Enable horizontal scroll when tabs overflow",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;

const StoryContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-2xl rounded-lg border border-border p-4">
    {children}
  </div>
);

export const Default: StoryFn<TabsStoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <StoryContainer>
      <Tabs
        defaultValue="account"
        orientation={args.orientation}
        className={
          args.orientation === "vertical" ? "flex w-[400px] gap-4" : "w-[400px]"
        }
      >
        <TabsList variant={args.variant} scrollable={args.scrollable}>
          <Tab value="account">{t("components.tabs.account")}</Tab>
          <Tab value="password" disabled={args.disabled}>
            {t("components.tabs.password")}
          </Tab>
        </TabsList>
        {args.orientation === "vertical" ? (
          <div className="flex-1">
            <TabsContent value="account">
              <p className="text-muted-foreground text-sm">
                {t("components.tabs.accountContent")}
              </p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-muted-foreground text-sm">
                {t("components.tabs.passwordContent")}
              </p>
            </TabsContent>
          </div>
        ) : (
          <>
            <TabsContent value="account">
              <p className="text-muted-foreground text-sm">
                {t("components.tabs.accountContent")}
              </p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-muted-foreground text-sm">
                {t("components.tabs.passwordContent")}
              </p>
            </TabsContent>
          </>
        )}
      </Tabs>
    </StoryContainer>
  );
};

Default.args = {
  orientation: "horizontal",
  variant: "default",
  disabled: false,
  scrollable: false,
};

export const Line: StoryFn = () => {
  const { t } = useTranslation();
  return (
    <StoryContainer>
      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsList variant="line">
          <Tab value="overview">{t("components.tabs.overview")}</Tab>
          <Tab value="analytics">{t("components.tabs.analytics")}</Tab>
          <Tab value="reports">{t("components.tabs.reports")}</Tab>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-muted-foreground text-sm">
            {t("components.tabs.overviewContent")}
          </p>
        </TabsContent>
        <TabsContent value="analytics">
          <p className="text-muted-foreground text-sm">
            {t("components.tabs.analyticsContent")}
          </p>
        </TabsContent>
        <TabsContent value="reports">
          <p className="text-muted-foreground text-sm">
            {t("components.tabs.reportsContent")}
          </p>
        </TabsContent>
      </Tabs>
    </StoryContainer>
  );
};

Line.parameters = {
  docs: {
    source: {
      code: `<Tabs defaultValue="overview" className="w-[400px]">
  <TabsList variant="line">
    <Tab value="overview">Overview</Tab>
    <Tab value="analytics">Analytics</Tab>
    <Tab value="reports">Reports</Tab>
  </TabsList>
  <TabsContent value="overview">
    <p className="text-muted-foreground text-sm">Overview content.</p>
  </TabsContent>
  <TabsContent value="analytics">
    <p className="text-muted-foreground text-sm">Analytics content.</p>
  </TabsContent>
  <TabsContent value="reports">
    <p className="text-muted-foreground text-sm">Reports content.</p>
  </TabsContent>
</Tabs>`,
    },
  },
};

export const Vertical: StoryFn = () => {
  const { t } = useTranslation();
  return (
    <StoryContainer>
      <Tabs
        defaultValue="account"
        orientation="vertical"
        className="flex w-[400px] gap-4"
      >
        <TabsList>
          <Tab value="account">{t("components.tabs.account")}</Tab>
          <Tab value="password">{t("components.tabs.password")}</Tab>
          <Tab value="notifications">{t("components.tabs.notifications")}</Tab>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="account">
            <p className="text-muted-foreground text-sm">
              {t("components.tabs.accountSettings")}
            </p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-muted-foreground text-sm">
              {t("components.tabs.passwordSettings")}
            </p>
          </TabsContent>
          <TabsContent value="notifications">
            <p className="text-muted-foreground text-sm">
              {t("components.tabs.notificationPreferences")}
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </StoryContainer>
  );
};

Vertical.parameters = {
  docs: {
    source: {
      code: `<Tabs defaultValue="account" orientation="vertical" className="flex w-[400px] gap-4">
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="password">Password</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabsList>
  <div className="flex-1">
    <TabsContent value="account">
      <p className="text-muted-foreground text-sm">Account settings.</p>
    </TabsContent>
    <TabsContent value="password">
      <p className="text-muted-foreground text-sm">Password settings.</p>
    </TabsContent>
    <TabsContent value="notifications">
      <p className="text-muted-foreground text-sm">Notification preferences.</p>
    </TabsContent>
  </div>
</Tabs>`,
    },
  },
};

export const Disabled: StoryFn = () => {
  const { t } = useTranslation();
  return (
    <StoryContainer>
      <Tabs defaultValue="home" className="w-[400px]">
        <TabsList>
          <Tab value="home">{t("components.tabs.home")}</Tab>
          <Tab value="settings" disabled>
            {t("components.tabs.disabled")}
          </Tab>
        </TabsList>
        <TabsContent value="home">
          <p className="text-muted-foreground text-sm">
            {t("components.tabs.homeContent")}
          </p>
        </TabsContent>
      </Tabs>
    </StoryContainer>
  );
};

Disabled.parameters = {
  docs: {
    source: {
      code: `<Tabs defaultValue="home" className="w-[400px]">
  <TabsList>
    <Tab value="home">Home</Tab>
    <Tab value="settings" disabled>
      Disabled
    </Tab>
  </TabsList>
  <TabsContent value="home">
    <p className="text-muted-foreground text-sm">Home content.</p>
  </TabsContent>
</Tabs>`,
    },
  },
};

export const Icons: StoryFn = () => {
  const { t } = useTranslation();
  return (
    <StoryContainer>
      <Tabs defaultValue="preview" className="w-[400px]">
        <TabsList>
          <Tab value="preview" tabIcon={<AppWindow className="size-4" />}>
            {t("components.tabs.preview")}
          </Tab>
          <Tab value="code" tabIcon={<Code className="size-4" />}>
            {t("components.tabs.code")}
          </Tab>
        </TabsList>
        <TabsContent value="preview">
          <p className="text-muted-foreground text-sm">
            {t("components.tabs.previewPanel")}
          </p>
        </TabsContent>
        <TabsContent value="code">
          <p className="text-muted-foreground text-sm">
            {t("components.tabs.codePanel")}
          </p>
        </TabsContent>
      </Tabs>
    </StoryContainer>
  );
};

Icons.parameters = {
  docs: {
    source: {
      code: `<Tabs defaultValue="preview" className="w-[400px]">
  <TabsList>
    <Tab value="preview" tabIcon={<AppWindow className="size-4" />}>
      Preview
    </Tab>
    <Tab value="code" tabIcon={<Code className="size-4" />}>
      Code
    </Tab>
  </TabsList>
  <TabsContent value="preview">
    <p className="text-muted-foreground text-sm">Preview panel.</p>
  </TabsContent>
  <TabsContent value="code">
    <p className="text-muted-foreground text-sm">Code panel.</p>
  </TabsContent>
</Tabs>`,
    },
  },
};

const SCROLLABLE_TAB_COUNT = 12;

export const Scrollable: StoryFn = () => {
  const { t } = useTranslation();
  const tabs = Array.from({ length: SCROLLABLE_TAB_COUNT }, (_, i) => i + 1);
  return (
    <StoryContainer>
      <div className="w-96 shrink-0 rounded-lg border p-2">
        <Tabs defaultValue="tab1" className="w-full min-w-0">
          <TabsList scrollable className="w-full">
            {tabs.map((tabIndex) => (
              <Tab key={tabIndex} value={`tab${tabIndex}`}>
                {t("components.tabs.tabNumber", { number: tabIndex })}
              </Tab>
            ))}
          </TabsList>
          {tabs.map((tabIndex) => (
            <TabsContent key={tabIndex} value={`tab${tabIndex}`}>
              <p className="text-muted-foreground py-2 text-sm">
                {t("components.tabs.tabContent", { number: tabIndex })}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </StoryContainer>
  );
};

Scrollable.parameters = {
  docs: {
    source: {
      code: `<Tabs defaultValue="tab1" className="w-full min-w-0">
  <TabsList scrollable className="w-full">
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
    <Tab value="tab3">Tab 3</Tab>
    <Tab value="tab4">Tab 4</Tab>
    <Tab value="tab5">Tab 5</Tab>
    <Tab value="tab6">Tab 6</Tab>
    {/* ... more tabs */}
  </TabsList>
  <TabsContent value="tab1">
    <p className="text-muted-foreground py-2 text-sm">Tab 1 content.</p>
  </TabsContent>
  {/* ... other TabsContent */}
</Tabs>`,
    },
  },
};

export const WithCards: StoryFn = () => {
  const { t } = useTranslation();
  return (
    <StoryContainer>
      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsList>
          <Tab value="overview">{t("components.tabs.overview")}</Tab>
          <Tab value="analytics">{t("components.tabs.analytics")}</Tab>
          <Tab value="reports">{t("components.tabs.reports")}</Tab>
          <Tab value="settings">{t("components.tabs.settings")}</Tab>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>{t("components.tabs.overviewTitle")}</CardTitle>
              <CardDescription>
                {t("components.tabs.overviewDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {t("components.tabs.overviewCardContent")}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>{t("components.tabs.analyticsTitle")}</CardTitle>
              <CardDescription>
                {t("components.tabs.analyticsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {t("components.tabs.analyticsCardContent")}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>{t("components.tabs.reportsTitle")}</CardTitle>
              <CardDescription>
                {t("components.tabs.reportsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {t("components.tabs.reportsCardContent")}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{t("components.tabs.settingsTitle")}</CardTitle>
              <CardDescription>
                {t("components.tabs.settingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {t("components.tabs.settingsCardContent")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StoryContainer>
  );
};

WithCards.parameters = {
  docs: {
    source: {
      code: `<Tabs defaultValue="overview" className="w-[400px]">
  <TabsList>
    <Tab value="overview">Overview</Tab>
    <Tab value="analytics">Analytics</Tab>
    <Tab value="reports">Reports</Tab>
    <Tab value="settings">Settings</Tab>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>View your key metrics and recent project activity.</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        You have 12 active projects and 3 pending tasks.
      </CardContent>
    </Card>
  </TabsContent>
  {/* ... other TabsContent with Card */}
</Tabs>`,
    },
  },
};
