import { AuthUserInfo } from "@/src/types/AuthTypes";
import { pluralToSingular } from "@/src/utils/resolves/resolveTittle";
import { usePathname, useSearchParams } from "next/navigation";
import { CreateCategoryForm, CreateClientForm, CreateCouponForm, CreateDiscountForm, CreateProductForm, CreateReturnProductForm, CreateStockForm, CreateSupplierForm, CreateUserForm, CreateWarrantyClaimForm, CreateWarrantyForm, DetailsProduct, DetailsReturnProducts, EditCategoryForm, EditClientForm, EditCouponForm, EditDiscountForm, EditProductForm, EditReturnForm, EditReturnSaleForm, EditStockForm, EditSupplierForm, EditUserForm, EditWarrantyClaimForm, EditWarrantyForm, ChangeStatusForm, CreateReturnSaleForm } from "@/src/components/dashboard/ui/generics";

interface GenericModalProps {
    user?: AuthUserInfo;
    defaultValues?: any;
    id?: string;
    closeModal: () => void;
}

export function useGenericModal({
    user,
    defaultValues,
    id,
    closeModal
}: GenericModalProps) {

    const path = usePathname();
    const searchParams = useSearchParams();
    const action = searchParams.get("action");
    const rawEntity = path.split("/")[2].includes("-") ? path.split("/")[2].replace("-", "_") : path.split("/")[2];

    const entity = pluralToSingular[rawEntity];

    const isDetails = action === "details" && !!entity
    const isCreate = action === "create" && !!entity;
    const isEdit = action === "edit" && !!entity && !!defaultValues;
    const isChangeStatus = action === "changeStatus" && !!entity && !!defaultValues;
    const showModal = isCreate || isEdit || isDetails || isChangeStatus;

    const getTitle = () => {
        let base = "";

        switch (action) {
            case "create":
                base = "Agregar";
                break;
            case "edit":
                base = "Editar";
                break;
            case "details":
                base = "Detalle de";
                break;
            case "changeStatus":
                base = "Cambiar estado de";
            default:
                base = "";
        }

        const entityName = entity?.charAt(0).toUpperCase() + entity?.slice(1);
        return `${base} ${entityName}`;
    };

    const renderForm = () => {
        if (!entity) return null;

        if (isCreate) {
            switch (entity) {
                case "proveedor": return <CreateSupplierForm closeModal={closeModal} />;
                case "producto": return <CreateProductForm user={user} closeModal={closeModal} />;
                case "usuario": return <CreateUserForm closeModal={closeModal} />;
                case "descuento": return <CreateDiscountForm closeModal={closeModal} />;
                case "categoria": return <CreateCategoryForm closeModal={closeModal} />;
                case "cupón": return <CreateCouponForm closeModal={closeModal} />;
                case "devolución_producto": return <CreateReturnProductForm user={user} closeModal={closeModal} />
                case "devolución_venta": return <CreateReturnSaleForm closeModal={closeModal} />
                case "stock": return <CreateStockForm user={user} closeModal={closeModal} />
                case "reclamo_garantia": return <CreateWarrantyClaimForm closeModal={closeModal} />
                case "garantia": return <CreateWarrantyForm closeModal={closeModal} />;
                case "cliente": return <CreateClientForm closeModal={closeModal} />
            }
        }

        if (isEdit) {
            switch (entity) {
                case "proveedor": return <EditSupplierForm id={id} closeModal={closeModal} defaultValues={defaultValues} />;
                case "producto": return <EditProductForm user={user} closeModal={closeModal} defaultValues={defaultValues} />;
                case "usuario": return <EditUserForm closeModal={closeModal} defaultValues={defaultValues} />;
                case "categoria": return <EditCategoryForm closeModal={closeModal} defaultValues={defaultValues} />;
                case "descuento": return <EditDiscountForm closeModal={closeModal} defaultValues={defaultValues} />;
                case "cupón": return <EditCouponForm closeModal={closeModal} defaultValues={defaultValues} />;
                case "devolución_producto": return <EditReturnForm user={user} closeModal={closeModal} defaultValues={defaultValues} />;
                case "stock": return <EditStockForm user={user} closeModal={closeModal} defaultValues={defaultValues} />
                case "devolución_venta": return <EditReturnSaleForm closeModal={closeModal} defaultValues={defaultValues} />;
                case "reclamo_garantia": return <EditWarrantyClaimForm user={user} closeModal={closeModal} defaultValues={defaultValues} />;
                case "garantia": return <EditWarrantyForm closeModal={closeModal} defaultValues={defaultValues} />;
                case "cliente": return <EditClientForm closeModal={closeModal} defaultValues={defaultValues} />
            }
        }

        if (isDetails) {
            switch (entity) {
                case "venta": return <DetailsProduct />
                case "devolución_venta": return <DetailsReturnProducts />
            }
        }

        if (isChangeStatus) {
            switch (entity) {
                case "devolución_venta": return <ChangeStatusForm defaultValues={defaultValues} />
            }
        }
        return null;
    };

    return {
        getTitle,
        renderForm,
        showModal,
        isDetails
    };
};
