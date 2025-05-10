import { NextResponse } from "next/server";

export const DELETE = async () => {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('AUTH_TOKEN'), {
        path: '/',
    };
    return response
}