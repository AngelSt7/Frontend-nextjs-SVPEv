import { useAppStore } from "@/src/store/useAppStore";
import { useRouter, useSearchParams } from "next/navigation";

export function useModalUtils() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const openModalCreate = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("action", "create");
        router.replace(`?${params.toString()}`);
    };

    const openDetailsModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("action", "details");
        router.replace(`?${params.toString()}`);
    };

    const openModalEdit = (id : number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("action", "edit");
        params.set("id", Number(id).toString());
        router.replace(`?${params.toString()}`);
    };

    const openModalStatus = (id : number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("action", "changeStatus");
        params.set("id", Number(id).toString());
        router.replace(`?${params.toString()}`);
    };

    const closeModal = () => {
        const params = new URLSearchParams();
        router.replace(`?${params.toString()}`);
    };

    return { openModalCreate, openDetailsModal, openModalEdit, closeModal, openModalStatus };
};
