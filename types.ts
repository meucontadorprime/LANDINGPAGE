export interface DiagnosticResponse {
  score: number;
  analysis: string;
  recommendations: string[];
  isAccountingRelated: boolean;
}

export enum SectionId {
  Hero = 'hero',
  Benefits = 'benefits',
  HowItWorks = 'how-it-works',
  Diagnostic = 'diagnostic',
  FAQ = 'faq'
}