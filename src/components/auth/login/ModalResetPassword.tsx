import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import InitPasswordForm from "../init-password/InitPasswordForm";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { authInfoUserService } from "@/src/services/auth/authInfoUserService";
import { useAppStore } from "@/src/store/useAppStore";
import { ModalCreateBaseProps } from "@/src/types/commonTypes/commonTypes";

export const ModalResetPassword = memo(function ModalResetPassword({ showModal }: ModalCreateBaseProps) {
  const toggleResetPasswordModal = useAppStore(state => state.toggleResetPasswordModal)
  const shouldShowResetPasswordModal = useAppStore(state => state.shouldShowResetPasswordModal)

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => authInfoUserService({toggleResetPasswordModal, shouldShowResetPasswordModal}),
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (user)
    return (
      <>
        <Modal size="xl" backdrop={"opaque"} isOpen={showModal}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-base sm:text-2xl text-center">
                  {`¡Bienvenido, ${user.correo}! Para completar tu primer inicio de sesión, necesitamos que cambies tu contraseña.`}
                </ModalHeader>
                <ModalBody>
                  <InitPasswordForm toggleResetPasswordModal={toggleResetPasswordModal} shouldShowResetPasswordModal={shouldShowResetPasswordModal} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
})

