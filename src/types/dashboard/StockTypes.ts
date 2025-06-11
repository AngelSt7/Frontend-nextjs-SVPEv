import { DashboardStockByIdSchema, DashboardStockSchema, DashboardStocksSchema, StockFormDataSchema } from "@/src/schemas/dashboard/Stock";
import { z } from "zod";


export type StockFormData = z.infer<typeof StockFormDataSchema>;
export type DashboardStock = z.infer<typeof DashboardStockSchema>;
export type DashboardStockById = z.infer<typeof DashboardStockByIdSchema>;
export type DashboardStocks = z.infer<typeof DashboardStocksSchema>;