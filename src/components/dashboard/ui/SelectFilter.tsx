import { Select, SelectItem } from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";

type SelectFilterProps = {
    filter: string;
    label: string;
    data: { key: string; label: string }[];
};

export default function SelectFilter({ filter, label, data }: SelectFilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const value = searchParams.get(filter) || "";

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value === "") {
            params.delete(filter);
        } else {
            params.set(filter, e.target.value);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex w-full min-w-24 flex-col gap-2">
            <Select
                className="w-full"
                label={label}
                placeholder="Seleccionar filtro"
                selectedKeys={[value]}
                onChange={handleSelectionChange}
            >
                {data.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
            </Select>
        </div>
    );
}
