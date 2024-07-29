export interface Portfolio {
  portfolio_id: number;
  name: string;
  type: string;
  image: string;
  holdings: Record<string, number>;
  percentages: Record<string, number>;
  wallet_ids?: {
    ETH: string[];
  };
}

export interface PortfoliosData {
  portfolios: Portfolio[];
}