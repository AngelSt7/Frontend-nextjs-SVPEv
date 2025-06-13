import { z } from "zod";
import { DashboardWarrantyClaimSchema, WarrantyClaimFormSchema, DashboardWarrantyClaimByIdSchema, DashboardWarrantyClaimsSchema } from '../../schemas/dashboard/Warranty-claim';

export type DashboardWarrantyClaim = z.infer<typeof DashboardWarrantyClaimSchema>;
export type WarrantyClaimFormData = z.infer<typeof WarrantyClaimFormSchema>;
export type DashboardWarrantyClaimById = z.infer<typeof DashboardWarrantyClaimByIdSchema>;
export type DashboardWarrantyClaims = z.infer<typeof DashboardWarrantyClaimsSchema>;

