'use client'
import { preguntasFrecuentes } from "@/src/utils/constants/fqa";
import { temaConfig } from "@/src/utils/constants/stylesFqa";
import { Accordion as AccordionComponent, AccordionItem } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import Contact from "./Contact";

const itemClasses = {
    base: "py-0 w-full",
};

export default function Fqa() {
    const parseRespuestaConLinks = (texto: string) => {
        const regex = /\/dashboard\/[\w/-]+/g;
        const partes = texto.split(regex);
        const links = texto.match(regex);

        if (!links) return texto;

        return partes.flatMap((parte, i) => [
            <span key={`text-${i}`}>{parte}</span>,
            links[i] ? (
                <Link
                    key={`link-${i}`}
                    href={links[i]}
                    className="text-blue-600 hover:text-blue-800 hover:underline mx-1 transition-colors duration-200 font-semibold"
                >
                    {links[i]}
                </Link>
            ) : null
        ]);
    };

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <div className="mb-8 text-center space-y-3">
                <h2 className="text-2xl font-bold text-foreground mb-2 pt-5 ">
                    Preguntas Frecuentes
                </h2>
                <p className="text-foreground-600 dark:text-foreground-400">
                    Encuentra respuestas rápidas a las consultas más comunes
                </p>
            </div>

            <AccordionComponent
                itemClasses={itemClasses}
                variant="splitted"
                className="gap-4"
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            height: "auto",
                            transition: {
                                height: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    duration: 1,
                                },
                                opacity: {
                                    easings: "ease",
                                    duration: 1,
                                },
                            },
                        },
                        exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            transition: {
                                height: {
                                    easings: "ease",
                                    duration: 0.25,
                                },
                                opacity: {
                                    easings: "ease",
                                    duration: 0.3,
                                },
                            },
                        },
                    },
                }}
            >
                {preguntasFrecuentes.map((pregunta, index) => {
                    const config = temaConfig[pregunta.tema as keyof typeof temaConfig] || temaConfig["Ayuda"];
                    const IconComponent = config.icon;

                    return (
                        <AccordionItem
                            key={pregunta.pregunta}
                            aria-label={pregunta.pregunta}
                            className=" border border-divider rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                            title={
                                <div className="flex items-center gap-4 py-2">
                                    <div className="flex-shrink-0">
                                        <div className={`w-10 h-10 rounded-full ${config.colors.light.bg} ${config.colors.dark.bg} flex items-center justify-center transition-colors duration-200`}>
                                            <IconComponent className={`w-5 h-5 ${config.colors.light.text} ${config.colors.dark.text}`} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-foreground text-left leading-tight">
                                            {pregunta.pregunta}
                                        </h3>
                                        <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${config.colors.light.chip} ${config.colors.dark.chip} transition-colors duration-200`}>
                                            {pregunta.tema}
                                        </span>
                                    </div>
                                </div>
                            }
                            classNames={{
                                trigger: "hover:bg-content2/50 transition-colors duration-200 rounded-xl",
                                content: "pb-6 pt-2",
                                title: "text-left"
                            }}
                        >
                            <div className="ml-14 pr-4">
                                <div className={`bg-content2/30 dark:bg-content2/20 rounded-lg p-4 border-l-4 ${config.colors.light.border} ${config.colors.dark.border}`}>
                                    <div className="text-sm leading-relaxed text-foreground-700 dark:text-foreground-700">
                                        {pregunta.respuesta.includes('\n') ? (
                                            <div className="whitespace-pre-line">
                                                {parseRespuestaConLinks(pregunta.respuesta)}
                                            </div>
                                        ) : (
                                            <p className="text-justify">
                                                {parseRespuestaConLinks(pregunta.respuesta)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </AccordionItem>
                    );
                })}
            </AccordionComponent>

            <Contact />
        </div>
    );
}