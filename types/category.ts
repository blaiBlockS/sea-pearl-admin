export type CategoryType = {
  title: string;
  href: string;
  iconSrc?: string;
  subCategories?: CategoryType[];
};
