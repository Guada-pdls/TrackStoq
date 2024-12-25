import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(req: Request, {params}: {params: {id: number}}) {
    try {
        const { id } = await params;
        const supplierId = Number(id);

        if (!id) {
            return new NextResponse('Supplier ID is required', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }  else if (isNaN(supplierId)) {
            return new NextResponse('Supplier ID must be a number', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        const supplier = await prisma.supplier.findFirst({
            where: {
                id: supplierId
            },
            include: {
                products: true
            }
        });
        if (!supplier) {
            return new NextResponse('Supplier not found', {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return new NextResponse(JSON.stringify(supplier), {
            status: 200,
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

export async function PUT(req: Request, {params}: {params: {id: number}}) {
    try {
        const { id } = await params;
        const supplierId = Number(id);
        
        if (!id) {
            return new NextResponse('Supplier ID is required', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else if (isNaN(supplierId)) {
            return new NextResponse('Supplier ID must be a number', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const data = await req.json();
        // Remove sensitive fields from the data
        delete data.id;

        const supplier = await prisma.supplier.update({
            where: {
                id: supplierId
            },
            data: data
        });
        return new NextResponse(JSON.stringify(supplier), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return new NextResponse('Supplier not found', {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

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

export async function DELETE(req: Request, {params}: {params: {id: number}}) {
    try {
        const { id } = await params;
        const supplierId = Number(id);
        
        if (!id) {
            return new NextResponse('Supplier ID is required', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else if (isNaN(supplierId)) {
            return new NextResponse('Supplier ID must be a number', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        const supplier = await prisma.supplier.delete({
            where: {
                id: supplierId
            }
        });

        if (!supplier) {
            return new NextResponse('Supplier not found', {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        return new NextResponse(JSON.stringify(supplier), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return new NextResponse('Supplier not found', {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

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