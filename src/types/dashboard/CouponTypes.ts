import { z } from "zod";
import { CouponFormDataSchema, DashboardCouponSchema, DashboardCouponsSchema } from '../schemas/dashboard/Coupon';

export type CouponFormData = z.infer<typeof CouponFormDataSchema>;

export type DashboardCoupon = z.infer<typeof DashboardCouponSchema>
export type DashboardCoupons = z.infer<typeof DashboardCouponsSchema>