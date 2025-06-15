import { Link, Button } from "@heroui/react";

export default function Navigation({ link, text } : { link: string, text: string }) {
    return (
        <div className=" flex items-center gap-3">
            <Button showAnchorIcon as={Link} href={link} className="bg-[#716a9c] text-white shadow-lg" radius="sm">
                {text}
            </Button>
        </div>
    )
}
