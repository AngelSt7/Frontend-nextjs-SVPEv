import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { usePathname, useSearchParams } from "next/navigation";
import CreateSupplierForm from "../suppliers/create/CreateSupplierForm";
import EditSupplierForm from "../suppliers/edit/EditSupplierForm";
import CreateProductForm from "../products/create/CreateProductForm";
import { pluralToSingular } from "@/src/utils/resolves/resolveTittle";

type GenericModalProps = {
  id?: string;
  closeModal: () => void;
  defaultValues?: any;
};

export default function GenericModal({ id, closeModal, defaultValues }: GenericModalProps) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const rawEntity = path.split("/")[2]; 

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
        case "producto": return <CreateProductForm closeModal={closeModal} />;
        // case "usuario": return <CreateUserForm closeModalCreate={closeModal} />;
      }
    }

    if (isEdit) {
      switch (entity) {
        case "proveedor": return <EditSupplierForm id={id} closeModal={closeModal} defaultValues={defaultValues} />;
        // case "producto": return <EditProductForm closeModalEdit={closeModal} defaultValues={defaultValues} />;
        // case "usuario": return <EditUserForm closeModalEdit={closeModal} defaultValues={defaultValues} />;
      }
    }
    return null;
  };

  if (!showModal) return null;

  return (
    <Modal size="xl" backdrop="opaque" isOpen={showModal} onClose={closeModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-base sm:text-2xl text-center">
              {getTitle()}
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
