export type Item = {
  shortDescription: string;
  price: string;
};

export type ProcessReceiptDTO = {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  total: string;
  items: Item[];
};

export type ReceiptDBEntry = ProcessReceiptDTO & {
  id: string;
  points: number;
};

export type ProcessReceiptReturn = {
  id: string;
};

export type GetPointsReturn = {
  points: number;
};
