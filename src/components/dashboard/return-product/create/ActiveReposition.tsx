import { ReturnProductFormData } from '@/src/types/dashboard/ReturnProductTypes';
import { Switch } from '@heroui/react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';

type ActiveRepositionProps = {
    register: UseFormRegister<ReturnProductFormData>;
    watch: UseFormWatch<ReturnProductFormData>;
    setValue: UseFormSetValue<ReturnProductFormData>;
};

export default function ActiveReposition({ register, watch, setValue }: ActiveRepositionProps) {
    const reposicionAplicada = watch("reposicion_aplicada");
    const isSelected = reposicionAplicada === 1;

    const handleChange = (value: boolean) => {
        setValue("reposicion_aplicada", value ? 1 : 0, { shouldValidate: true });
    };

    return (
        <div className="flex flex-col gap-2">
            <Switch isSelected={isSelected} onValueChange={handleChange}>
                ¿Aplicar reposición?
            </Switch>

            <input type="hidden" {...register("reposicion_aplicada")} value={reposicionAplicada} />

        </div>
    );
}
