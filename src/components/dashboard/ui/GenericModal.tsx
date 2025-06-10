import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { usePathname, useSearchParams } from "next/navigation";
import CreateSupplierForm from "../suppliers/create/CreateSupplierForm";
import EditSupplierForm from "../suppliers/edit/EditSupplierForm";
import CreateProductForm from "../products/create/CreateProductForm";
import { pluralToSingular } from "@/src/utils/resolves/resolveTittle";
import { AuthUserInfo } from "@/src/types/AuthTypes";
import EditProductForm from "../products/edit/EditProductForm";
import CreateUserForm from "../users/create/CreateUserForm";
import EditUserForm from "../users/edit/EditUserForm";
import CreateCategoryForm from "../category/create/CreateCategoryForm";
import EditCategoryForm from "../category/edit/EditCategoryForm";
import CreateDiscountForm from "../discount/create/CreateDiscountForm";
import EditDiscountForm from "../discount/edit/EditDiscountForm";
import CreateCouponForm from "../coupons/create/CreateCouponForm";
import EditCouponForm from "../coupons/edit/EditCouponForm";
import CreateReturnForm from "../return/create/CreateReturnForm";
import EditReturnForm from "../return/edit/EditReturnForm";
import CreateStockForm from "../stock/create/CreateStockForm";

type GenericModalProps = {
  user?: AuthUserInfo;
  id?: string;
  closeModal: () => void;
  defaultValues?: any;
  idReturnProduct?: number;
  clearIdReturnProduct?: () => void
};

export default function GenericModal({ user, id, closeModal, defaultValues, idReturnProduct, clearIdReturnProduct }: GenericModalProps) {

  const path = usePathname();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const rawEntity = path.split("/")[2].includes("-") ? path.split("/")[2].replace("-", "_") : path.split("/")[2];

  const entity = pluralToSingular[rawEntity];

  const isCreate = action === "create" && !!entity;
  const isEdit = action === "edit" && !!entity && !!defaultValues;
  const showModal = isCreate || isEdit;

  const getTitle = () => {
    const base = isCreate ? "Agregar" : "Editar";
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
        case "devolución_producto":  return  <CreateReturnForm closeModal={closeModal} idReturnProduct={idReturnProduct!} />
        case "stock": return  <CreateStockForm user={user} closeModal={closeModal} />
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
        case "devolución_producto": return <EditReturnForm closeModal={closeModal} defaultValues={defaultValues} />;
      }
    }
    return null;
  };

  if (!showModal) return null;

  const tittle = getTitle();
  return (
    <Modal scrollBehavior="inside" size="xl" backdrop="opaque" isOpen={showModal} onClose={closeModal}>
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
