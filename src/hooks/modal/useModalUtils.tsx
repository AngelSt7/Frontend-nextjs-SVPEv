import { useRouter, useSearchParams } from "next/navigation";

export function useModalUtils() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const closeModalCreate = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("action");
        router.replace(`?${params.toString()}`);
    };

    const openModalCreate = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("action", "create");
        router.replace(`?${params.toString()}`);
    };

    return { closeModalCreate, openModalCreate };
};
