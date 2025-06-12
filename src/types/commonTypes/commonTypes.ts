
import { ChangeStatusSupplierService } from "@/src/services/dashboard/Supplier/dashboardChangeStatusSupplierService";
import { UseMutateFunction } from "@tanstack/react-query";
import { SVGProps } from "react";

// Muestra una modal
export type ModalCreateBaseProps = { showModal: boolean }

export type ColumnsType = ({
    name: string;
    uid: string;
    sortable: boolean;
} | {
    name: string;
    uid: string;
    sortable?: undefined;
})[]

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// typado de funciones
export type mutateProps = UseMutateFunction<any, Error, ChangeStatusSupplierService, unknown>  
