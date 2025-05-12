import { ReactNode } from "react";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  createdAt: string;
  rating: number;
  category: number;
  tags: string[];
  userId: string;
  recommendationImages: {
    id: string;
    url: string;
  }[];
}
export interface DetailedRecommendationCardProps {
  recommendation: Recommendation;
  categoryIcon: ReactNode;
}
export const categories = {
  Restaurant: 0,
  Cafeteria: 1,
  Museum: 2,
  LeisureZone: 3,
  Park: 4,
  HistoricalSite: 5,
  Shopping: 6,
  Bar: 7,
  Other: 8,
} as const;
