import { CouponFormDataSchema, DashboardCouponByIdSchema, DashboardCouponSchema, DashboardCouponsSchema } from "@/src/schemas/dashboard/Coupon";
import { z } from "zod";

export type CouponFormData = z.infer<typeof CouponFormDataSchema>;
export type DashboardCuponById = z.infer<typeof DashboardCouponByIdSchema>
export type DashboardCoupon = z.infer<typeof DashboardCouponSchema>
export type DashboardCoupons = z.infer<typeof DashboardCouponsSchema>