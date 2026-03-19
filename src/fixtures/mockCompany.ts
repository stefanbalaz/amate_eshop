import { amateLogoColourful, amateLogoWhite } from "@/assets";

export type MockFooterDescription = {
  primaryText: string;
  secondaryText?: string;
  showHeartIcon?: boolean;
};

export type MockHeaderData = {
  logoSrc: string;
  logoAlt: string;
  homeTo: string;
  infoLink: {
    href: string;
    label: string;
  };
  phone: {
    display: string;
    href: string;
  };
};

export type MockSocialLink = {
  id: string;
  platform: "instagram" | "facebook";
  href: string;
  label: string;
};

export type MockContactInfo = {
  email: string;
  phone: string;
  addressLines: string[];
};

export type MockLegalLink = {
  id: string;
  label: string;
  to: string;
};

export type MockCompanyData = {
  header: MockHeaderData;
  brandName: string;
  logoSrc: string;
  logoAlt: string;
  description: MockFooterDescription;
  sectionTitles: {
    contact: string;
    legal: string;
  };
  socialLinks: MockSocialLink[];
  contact: MockContactInfo;
  legalLinks: MockLegalLink[];
  bottomBar: {
    copyright: string;
    creditsLabel: string;
    creditsText: string;
    creditsHref: string;
  };
};

export const mockCompanyData: MockCompanyData = {
  header: {
    logoSrc: amateLogoColourful,
    logoAlt: "AMATE Header Logo",
    homeTo: "/",
    infoLink: {
      href: "#mehr-informationen",
      label: "Viac informácií",
    },
    phone: {
      display: "+421 (0) 911 561 885",
      href: "tel:+421911561885",
    },
  },
  brandName: "AMATE",
  logoSrc: amateLogoWhite,
  logoAlt: "AMATE Logo",
  description: {
    primaryText: "AMATE je značka 3-Logy spol. s r.o.",
    secondaryText: "Made with love in Slovakia",
    showHeartIcon: true,
  },
  sectionTitles: {
    contact: "Kontakt",
    legal: "Legal",
  },
  socialLinks: [
    {
      id: "instagram",
      platform: "instagram",
      href: "https://www.instagram.com/drinkamate/",
      label: "Instagram Profil",
    },
    {
      id: "facebook",
      platform: "facebook",
      href: "https://www.facebook.com/DrinkAmate",
      label: "Facebook Profil",
    },
  ],
  contact: {
    email: "info@3-logy.com",
    phone: "+421 (0) 911 561 885",
    addressLines: ["Nevidzany 187, 95162, Slovenská republika"],
  },
  legalLinks: [
    {
      id: "imprint",
      label: "[Imprint / Privacy]",
      to: "/placeholder-imprint",
    },
    {
      id: "terms",
      label: "[Terms & Conditions]",
      to: "/placeholder-terms",
    },
  ],
  bottomBar: {
    copyright: `Copyright ${new Date().getFullYear()} 3-Logy spol. s r.o.`,
    creditsLabel: "Webshop & Design:",
    creditsText: "Štefan Baláž",
    creditsHref: "https://www.stefanbalaz.com",
  },
};
