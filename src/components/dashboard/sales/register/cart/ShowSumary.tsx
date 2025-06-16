import { useAppStore } from "@/src/store/useAppStore";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useMemo, useState } from "react";
import RequestCartForm from "./RequestCartForm";

export default function ShowSumary() {
    const showModal = useAppStore(state => state.showModal);
    const toggleShowModal = useAppStore(state => state.toggleShowModal);
    const increaseQuantity = useAppStore(state => state.increaseQuantity);
    const decreaseQuantity = useAppStore(state => state.decreaseQuantity);
    const deleteProduct = useAppStore(state => state.deleteProduct);
    const cart = useAppStore(state => state.cart);
    const igv = useMemo(() => cart.reduce((sum, item) => sum + item.igv, 0), [cart]);
    const total = useMemo(() => cart.reduce((sum, item) => sum + (item.subtotal + item.igv), 0), [cart]);
    const [step, setStep] = useState(true);

    return (
        <Modal size="xl" scrollBehavior="inside" isOpen={showModal} onClose={() => toggleShowModal()}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Resumen de la venta</ModalHeader>
                        <ModalBody>
                            <>
                                <RequestCartForm
                                    step={step}
                                    cart={cart}
                                    igv={igv}
                                    total={total}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    deleteProduct={deleteProduct}
                                />
                            </>
                        </ModalBody>

                        <ModalFooter>
                            <div className=" flex  justify-between w-full">
                                <Button disabled={cart.length === 0} className="w-fix bg-[#716a9c] text-white shadow-lg" onPress={() => setStep(!step)}>{step ? 'Continuar' : 'Ver resumen'}</Button>
                                <div className=" flex gap-4">
                                    <Button color="danger" variant="light" onPress={() => toggleShowModal()}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
