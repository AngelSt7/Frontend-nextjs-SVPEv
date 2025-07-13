import { z } from "zod";
import { DashboardStockByIdSchema, DashboardStocksSchema, StockFormDataSchema } from "@/src/schemas/dashboard/Stock";

export type StockFormData = z.infer<typeof StockFormDataSchema>;
export type DashboardStockById = z.infer<typeof DashboardStockByIdSchema>;
export type DashboardStocks = z.infer<typeof DashboardStocksSchema>;