import { z } from "zod";
import { StockFormDataSchema, DashboardStockSchema, DashboardStockByIdSchema, DashboardStocksSchema } from "../schemas/dashboard/Stock";

export type StockFormData = z.infer<typeof StockFormDataSchema>;
export type DashboardStock = z.infer<typeof DashboardStockSchema>;
export type DashboardStockById = z.infer<typeof DashboardStockByIdSchema>;
export type DashboardStocks = z.infer<typeof DashboardStocksSchema>;