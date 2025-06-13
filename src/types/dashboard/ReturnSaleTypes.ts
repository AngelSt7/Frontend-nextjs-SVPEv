import { z } from "zod";
import { DashboardReturnSaleSchema, ReturnSaleFormDataSchema, DashboardReturnSaleByIdSchema, DashboardReturnsSalesSchema } from '../../schemas/dashboard/Return-sale';

export type DashboardReturnSale = z.infer<typeof DashboardReturnSaleSchema>;
export type ReturnSaleFormData = z.infer<typeof ReturnSaleFormDataSchema>;
export type DashboardReturnSaleById = z.infer<typeof DashboardReturnSaleByIdSchema>;
export type DashboardReturnsSales = z.infer<typeof DashboardReturnsSalesSchema>;
