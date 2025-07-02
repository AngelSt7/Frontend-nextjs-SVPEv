import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { pluralToSingular } from "@/src/utils/resolves/resolveTittle";
import { AuthUserInfo } from "@/src/types/AuthTypes";
import { CreateCategoryForm, EditCategoryForm, CreateClientForm, EditClientForm, CreateCouponForm, EditCouponForm, CreateDiscountForm, EditDiscountForm, CreateProductForm, EditProductForm, CreateReturnProductForm, EditReturnForm, CreateReturnSaleForm, EditReturnSaleForm, CreateStockForm, EditStockForm, CreateSupplierForm, EditSupplierForm, CreateUserForm, EditUserForm, CreateWarrantyClaimForm, EditWarrantyClaimForm, CreateWarrantyForm, EditWarrantyForm, DetailsReturnProducts, DetailsProduct } from ".";

type GenericModalProps = {
  user?: AuthUserInfo;
  id?: string;
  closeModal: () => void;
  defaultValues?: any;
};

export default function GenericModal({ user, id, closeModal, defaultValues }: GenericModalProps) {

  const path = usePathname();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const rawEntity = path.split("/")[2].includes("-") ? path.split("/")[2].replace("-", "_") : path.split("/")[2];

  const entity = pluralToSingular[rawEntity];

  const isDetails = action === "details" && !!entity
  const isCreate = action === "create" && !!entity;
  const isEdit = action === "edit" && !!entity && !!defaultValues;
  const showModal = isCreate || isEdit || isDetails;

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
        case "garantia": return <EditWarrantyForm user={user} closeModal={closeModal} defaultValues={defaultValues} />;
        case "cliente": return <EditClientForm closeModal={closeModal} defaultValues={defaultValues} />
      }
    }

    if (isDetails) {
      switch (entity) {
        case "venta": return <DetailsProduct />
        case "devolución_venta": return <DetailsReturnProducts />
      }
    }
    return null;
  };

  if (!showModal) return null;

  const tittle = getTitle();
  
  return (
    <Modal scrollBehavior="inside" size={isDetails ? "2xl" : "xl"} backdrop="opaque" isOpen={showModal} onClose={closeModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-base sm:text-2xl text-center">
              {tittle.includes('_') ? tittle.replace('_', ' de ') : tittle}
            </ModalHeader>
            <ModalBody>
              {renderForm()}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
