import Input from '@/src/components/ui/Input';
import { FieldError, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useGetProducts } from '@/src/hooks/dashboard/useGetProducts';
import SelectTabs from './SelectTabs';
import { useGetSuppliers } from '@/src/hooks/dashboard/useGetSuppliers';
import SelectItem from '../../ui/SelectItem';
import SerieTabs from './SerieTabs';
import { Switch } from '@heroui/react';
import { useEffect, useState } from 'react';
import { StockFormData } from '@/src/types/dashboard/Stocktypes';

type StockFormProps = {
    register: UseFormRegister<StockFormData>;
    errors: FieldErrors<StockFormData>;
    watch: UseFormWatch<StockFormData>;
    setValue: UseFormSetValue<StockFormData>;
};

export default function StockForm({ register, errors, watch, setValue }: StockFormProps) {
    const { data: products = [] } = useGetProducts();
    const { data: suppliers = [] } = useGetSuppliers();

    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        setValue('tipo_serie', isSelected ? 'serie' : 'individual');
    }, [isSelected]);

    return (
        <div className="flex flex-col gap-4">
            <SelectTabs
                name="id_producto"
                label="Producto"
                data={products.map((p) => ({ label: p.nombre, value: p.id }))}
                setValue={setValue}
                watch={watch}
                register={register('id_producto', {
                    required: 'Este campo es obligatorio',
                })}
                errorMessage={errors.id_producto}
            />

            <SelectTabs
                name="id_proveedor"
                label="Proveedor"
                data={suppliers.map((p) => ({ label: p.razon_social, value: p.id }))}
                setValue={setValue}
                watch={watch}
                register={register('id_proveedor', {
                    required: 'Este campo es obligatorio',
                })}
                errorMessage={errors.id_proveedor}
            />

            <div className="grid grid-cols-2 gap-5">
                <SelectItem
                    name="tipo_documento"
                    label="Tipo de documento"
                    data={[
                        { id: 1, label: 'Factura', activo: 1 },
                        { id: 2, label: 'Boleta', activo: 1 },
                    ]}
                    register={register('tipo_documento', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                    })}
                    watch={watch}
                    setValue={setValue}
                    errorMessage={errors.tipo_documento}
                />

                <Input
                    type="text"
                    htmlFor="numero_documento"
                    label="N° Documento"
                    placeholder="Ej: F001-000125"
                    maxLength={11}
                    register={register('numero_documento', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^F\d{3}-\d{6}$/,
                            message: 'Formato inválido. Ej: F001-000125',
                        },
                    })}
                    errorMessage={errors.numero_documento}
                />
            </div>

            <div className="grid grid-cols-2 gap-5">
                <Input
                    type="number"
                    htmlFor="cantidad_producto"
                    label="Cantidad"
                    placeholder="Cantidad ingresada"
                    register={register('cantidad_producto', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: 'La cantidad debe ser mayor a 1',
                        },
                    })}
                    errorMessage={errors.cantidad_producto}
                />

                <Input
                    type="number"
                    htmlFor="precio_unitario"
                    label="Precio unitario (S/)"
                    placeholder="Ej: 700.00"
                    register={register('precio_unitario', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                        min: {
                            value: 0.01,
                            message: 'El precio debe ser mayor a 0',
                        },
                    })}
                    errorMessage={errors.precio_unitario}
                />
            </div>

            <div>
                <div className="flex gap-4 mt-2 justify-between">
                    <label className="text-base font-semibold text-[#202021]">Habilitar Series</label>
                    <Switch isSelected={isSelected} onValueChange={setIsSelected} size="sm" />
                </div>

                <SerieTabs
                    isEnabled={isSelected}
                    name="series_individuales"
                    register={register('series_individuales')}
                    setValue={setValue}
                    watch={watch}
                    errorMessage={errors.series_individuales as FieldError}
                />
            </div>

            <Input
                type="textarea"
                htmlFor="observaciones"
                label="Observaciones"
                maxLength={200}
                placeholder="Detalles del ingreso"
                register={register('observaciones', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 15,
                        message: 'Debe tener al menos 15 caracteres',
                    },
                    maxLength: {
                        value: 200,
                        message: 'No debe superar los 200 caracteres',
                    },
                })}
                errorMessage={errors.observaciones}
            />
        </div>
    );
}
