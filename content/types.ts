export type Locale = "en" | "tr";

export interface LocalizedProject {
  readonly projectType: string;
  readonly description: string;
  readonly services: readonly string[];
  readonly industry: string;
}

export interface LocalizedEngagement {
  readonly audience: string;
  readonly timelineLabel: string;
  readonly scopeLabel: string;
  readonly scope: readonly string[];
  readonly scopeIntro?: string;
  readonly note?: string;
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
    readonly workingWorldwide: string;
    readonly selectedWork: string;
    readonly projectCount: string;
    readonly services: string;
    readonly sector: string;
    readonly year: string;
    readonly viewProject: string;
    readonly pricePrefix: string;
    readonly conceptWebsite: string;
    readonly websiteEngagements: string;
    readonly typicalTimeline: string;
    readonly terms: string;
    readonly approach: string;
    readonly capabilities: string;
    readonly contactPrompt: string;
    readonly copyEmail: string;
    readonly emailCopied: string;
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
    readonly title: string;
    readonly location: string;
  };
  readonly selectedWork: {
    readonly framing: string;
  };
  readonly projects: Readonly<Record<string, LocalizedProject>>;
  readonly engagements: Readonly<Record<string, LocalizedEngagement>>;
  readonly approach: readonly { readonly title: string; readonly description: string }[];
  readonly approachHeading: string;
  readonly studioStatement: string;
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
