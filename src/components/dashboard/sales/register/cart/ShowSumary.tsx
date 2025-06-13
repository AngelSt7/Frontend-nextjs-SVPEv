import { useAppStore } from "@/src/store/useAppStore";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useMemo, useState } from "react";
import TotalPay from "./TotalPay";
import RequestCartForm from "./RequestCartForm";

export default function ShowSumary() {
    const showModal = useAppStore(state => state.showModal);
    const toggleShowModal = useAppStore(state => state.toggleShowModal);
    const cart = useAppStore(state => state.cart);
    const increaseQuantity = useAppStore(state => state.increaseQuantity);
    const decreaseQuantity = useAppStore(state => state.decreaseQuantity);
    const deleteProduct = useAppStore(state => state.deleteProduct);
    const total = useMemo(() => cart.reduce((item, acc) => item + ((acc.precio_venta * acc.cantidad) * (1 - (acc.descuento / 100))), 0), [cart])
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
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    deleteProduct={deleteProduct}
                                />
                                <TotalPay total={total} />
                            </>
                        </ModalBody>

                        <ModalFooter>
                            <div className=" flex  justify-between w-full">
                                <Button className="w-fix" color="warning" onPress={() => setStep(!step)}>{step ? 'Proceder' : 'Ver resumen'}</Button>
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
