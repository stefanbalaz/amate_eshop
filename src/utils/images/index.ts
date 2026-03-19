export type ImageResource =
  | string
  | {
      url?: string | null;
      key?: string | null;
    }
  | null
  | undefined;

export const getImage = (resource: ImageResource): string | undefined => {
  if (!resource) return undefined;
  if (typeof resource === "string") return resource;
  return resource.url ?? resource.key ?? undefined;
};
