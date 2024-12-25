import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {id: number}}) {
    try {
        const { id } = await params;
        const productId = Number(id);

        if (!id) {
            return new NextResponse('Product ID is required', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else if (isNaN(productId)) {
            return new NextResponse('Product ID must be a number', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        const product = await prisma.product.findFirst({
            where: {
                id: productId
            }
        });
        if (!product) {
            return new NextResponse('Product not found', {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return new NextResponse(JSON.stringify(product), {
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
        const productId = Number(id);

        if (!id) {
            return new NextResponse('Product ID is required', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else if (isNaN(productId)) {
            return new NextResponse('Product ID must be a number', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const data = await req.json();
        // Remove sensitive fields from the data
        delete data.id;
        delete data.createdAt;
        delete data.updatedAt;

        const product = await prisma.product.update({
            where: {
            id: productId
            },
            data: data
        });
        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return new NextResponse('Product not found', {
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
        const productId = Number(id);

        if (!id) {
            return new NextResponse('Product ID is required', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else if (isNaN(productId)) {
            return new NextResponse('Product ID must be a number', {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        const product = await prisma.product.delete({
            where: {
                id: productId
            }
        });
        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return new NextResponse('Product not found', {
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