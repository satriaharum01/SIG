import axios from "axios";
import type { ITransaksi } from "../types/transaksi";

const api = axios.create({
  baseURL: "http://localhost:5000/api/transaksi",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface TransaksiResponse {
  status: boolean;
  data: ITransaksi[];
  total?: number;
}

export const getTransaksi = async (): Promise<TransaksiResponse> => {
  const response = await api.get<TransaksiResponse>("/");

  return response.data;
};
