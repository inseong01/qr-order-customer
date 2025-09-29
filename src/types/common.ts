export type LoadingType = "link" | "";

// variant
export type Status = "" | "pending" | "fulfilled" | "rejected";

export type SelectedMenu = {
  name: string;
  price: number;
  amount: number;
  id: string;
};
export type Request = {
  id: string;
  title: string;
  amount: number;
};
