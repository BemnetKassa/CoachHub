export interface Transformation {
  id: string;
  name: string;
  achievement: string;
  quote: string;
  program: string;
  image_before_url: string;
  image_after_url: string;
  created_at?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  price_id: string;
  popular: boolean;
  order_index?: number;
  created_at?: string;
}
