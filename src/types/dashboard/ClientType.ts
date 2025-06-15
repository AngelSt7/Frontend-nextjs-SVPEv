import { z } from "zod";
import { ClientFormDataSchema, DashboardClientByIdSchema, DashboardClientSchema } from "@/src/schemas/dashboard/Client";

export type DashboardClientById= z.infer<typeof DashboardClientByIdSchema>
export type ClientFormData= z.infer<typeof ClientFormDataSchema>
export type DashboardClient = z.infer<typeof DashboardClientSchema>