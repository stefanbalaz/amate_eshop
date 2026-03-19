export type MockContent = {
  hero: {
    claim: string;
    headline: string;
    description: string;
    buttonPrimary: {
      label: string;
      href: string;
    };
    buttonSecondary: {
      label: string;
      href: string;
    };
  };
};

export const mockContent: MockContent = {
  hero: {
    claim: "Love your energy",
    headline: "Remeselný nápoj z maté",
    description:
      "AMATE je osviežujúci sýtený nápoj s vysokým obsahom kofeínu (30 mg na 100 ml), nálevom z listov maté a rastlinnými extraktmi.",
    buttonPrimary: {
      label: "Kúpiť teraz",
      href: "/shop",
    },
    buttonSecondary: {
      label: "Viac informácií",
      href: "/about",
    },
  },
};
