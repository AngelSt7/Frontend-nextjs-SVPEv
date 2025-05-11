import { Button } from "@heroui/react";

type ButtonCreateProps = {
    openModalCreate:  () => void
}

export const registers = [ { key: "5", label: "5 registros" }, { key: "10", label: "10 registros" }, { key: "15", label: "15 registros" }];

export default function ButtonCreate({openModalCreate }: ButtonCreateProps) {
    return (
        <div className=' w-full flex flex-row justify-between gap-4'>
                <Button
                    className="bg-[#2c2c2c] text-white shadow-lg"
                    radius="sm"
                    onPress={()=> openModalCreate()}
                >
                    Agregar proveedor
                </Button>
        </div>
    )
}