
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { UseMutateFunction } from "@tanstack/react-query";
import { SVGProps } from "react";

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

export type ItemOption = { label: string; value: number }

// typado de funciones
export type mutateProps = UseMutateFunction<any, Error, ChangeStatus, unknown>
