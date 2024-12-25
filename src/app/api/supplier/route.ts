import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const supplier = await prisma.supplier.create(({
            data: data
        }))
        return new NextResponse(JSON.stringify(supplier), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(error.message, {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return new NextResponse('An unknown error occurred', {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export async function GET(req: Request) {
    try {
        const suppliers = await prisma.supplier.findMany();
        return new NextResponse(JSON.stringify(suppliers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(error.message, {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return new NextResponse('An unknown error occurred', {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })  
    }
}