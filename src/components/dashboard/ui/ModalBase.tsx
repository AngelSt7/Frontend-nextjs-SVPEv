import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { usePathname, useSearchParams } from "next/navigation";
import CreateSupplierForm from "../proveedores/create/CreateSupplierForm";

type ModalBaseProps = {
  tittle: string,
  closeModalCreate: () => void
}

export default function ModalBase({tittle, closeModalCreate}: ModalBaseProps) {
  const path = usePathname()
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const showModal = path === '/dashboard/proveedores' &&  action === 'create' ? true : false

  return (
    <>
      <Modal size="xl" backdrop={"opaque"} isOpen={showModal} onClose={closeModalCreate}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-base sm:text-2xl text-center">{tittle}</ModalHeader>
              <ModalBody>
                {path === '/dashboard/proveedores' && action === 'create' && ( <CreateSupplierForm closeModalCreate={closeModalCreate} /> )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
