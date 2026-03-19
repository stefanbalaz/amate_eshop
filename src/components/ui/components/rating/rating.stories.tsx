import type { Meta, StoryFn } from "@storybook/react-vite";

import { Rating, type RatingProps } from "./rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    reviewAverage: { control: { type: "number" } },
    reviewsCount: { control: { type: "number" } },
    href: { control: { type: "text" } },
    max: { control: { type: "number" } },
  },
};

export default meta;

type StoryArgs = Partial<RatingProps>;

export const Default: StoryFn<StoryArgs> = (args) => (
  <Rating
    reviewAverage={args.reviewAverage ?? 4.7}
    reviewsCount={args.reviewsCount ?? 128}
    href={args.href ?? "#reviews"}
    max={args.max ?? 5}
  />
);

export const WithoutLink: StoryFn<StoryArgs> = (args) => (
  <Rating
    reviewAverage={args.reviewAverage ?? 4.2}
    reviewsCount={args.reviewsCount ?? 36}
    max={args.max ?? 5}
  />
);

export const ZeroRating: StoryFn<StoryArgs> = (args) => (
  <Rating
    reviewAverage={args.reviewAverage ?? 0}
    reviewsCount={args.reviewsCount ?? 0}
    href={args.href ?? "#reviews"}
    max={args.max ?? 5}
  />
);

export const PartialRating: StoryFn<StoryArgs> = (args) => (
  <Rating
    reviewAverage={args.reviewAverage ?? 2.5}
    reviewsCount={args.reviewsCount ?? 19}
    href={args.href ?? "#reviews"}
    max={args.max ?? 5}
  />
);

export const SevenStarScale: StoryFn<StoryArgs> = (args) => (
  <Rating
    reviewAverage={args.reviewAverage ?? 5.8}
    reviewsCount={args.reviewsCount ?? 482}
    href={args.href ?? "#reviews"}
    max={args.max ?? 7}
  />
);
