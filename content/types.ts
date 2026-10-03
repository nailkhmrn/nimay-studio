export type Locale = "en" | "tr";

// A phrase rendered with one highlighted segment, e.g. hero title or studio statement.
export interface EmphasisText {
  readonly before: string;
  readonly emphasis: string;
  readonly after: string;
}

export interface LocalizedProject {
  readonly projectType: string;
  readonly description: string;
  readonly services: readonly string[];
  readonly industry: string;
  // One alt text per entry in the shared project gallery, in the same order.
  readonly imageAlts: readonly string[];
}

export interface LocalizedOffer {
  readonly name: string;
  readonly audience: string;
  readonly timelineValue: string;
  readonly timelineUnit: string;
  readonly scopeLabel: string;
  readonly scope: readonly string[];
  readonly note: string;
}

export interface SiteContent {
  readonly languageName: string;
  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly ogTitle: string;
    readonly ogDescription: string;
    readonly ogLocale: "en_US" | "tr_TR";
    readonly alternateLocale: "tr_TR" | "en_US";
    readonly imageAlt: string;
  };
  readonly labels: {
    readonly home: string;
    readonly work: string;
    readonly engagements: string;
    readonly studio: string;
    readonly contact: string;
    readonly language: string;
    readonly darkAction: string;
    readonly lightAction: string;
    readonly menu: string;
    readonly close: string;
    readonly navigation: string;
    readonly mobileNavigation: string;
    readonly skipToContent: string;
    readonly basedIn: string;
    readonly selectedWork: string;
    readonly conceptWork: string;
    readonly services: string;
    readonly sector: string;
    readonly year: string;
    readonly viewProject: string;
    readonly conceptWebsite: string;
    readonly websiteEngagements: string;
    readonly typicalTimeline: string;
    readonly terms: string;
    readonly approach: string;
    readonly approachSteps: string;
    readonly capabilities: string;
    readonly capabilitiesSummary: string;
    readonly contactPrompt: string;
    readonly copyEmail: string;
    readonly emailCopied: string;
    readonly emailSubject: string;
    readonly whatsapp: string;
    readonly whatsappMessage: string;
    readonly privacy: string;
    readonly privacyPreferences: string;
    readonly analyticsPreferences: string;
    readonly allowAnalytics: string;
    readonly rejectAnalytics: string;
    readonly analyticsDescription: string;
    readonly footerStudioDescriptor: string;
    readonly viewProjectAria: string;
  };
  readonly hero: {
    readonly kicker: string;
    readonly title: EmphasisText;
    readonly location: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly processCaption: string;
    readonly stages: readonly { readonly label: string; readonly caption: string }[];
    readonly liveImageAlt: string;
  };
  readonly selectedWork: {
    readonly framing: string;
  };
  readonly projects: Readonly<Record<string, LocalizedProject>>;
  readonly offer: LocalizedOffer;
  readonly approach: readonly { readonly title: string; readonly description: string }[];
  readonly approachHeading: string;
  readonly studioStatement: EmphasisText;
  readonly capabilities: readonly { readonly title: string; readonly items: readonly string[] }[];
  readonly contact: {
    readonly heading: string;
    readonly guidance: string;
    readonly location: string;
  };
  readonly privacy: {
    readonly kicker: string;
    readonly title: string;
    readonly updated: string;
    readonly sections: readonly { readonly number: string; readonly title: string; readonly paragraphs: readonly string[] }[];
    readonly contactLabel: string;
    readonly contactHeading: string;
  };
  readonly notFound: {
    readonly kicker: string;
    readonly title: string;
    readonly home: string;
  };
  readonly terms: readonly string[];
}
