export interface SignUp {
    name: string,
    password: string, 
    email: string
}

export interface Login {
    email: string,
    password: string
}

export interface Product {
    id: string
    name: string,
    price: number, 
    color: string,
    category: string,
    description: string,
    image: string,
    quantity?: number
}

export interface Cart {
    id: string | undefined,
    name: string,
    price: number, 
    color: string,
    category: string,
    description: string,
    image: string,
    quantity?: number,
    userId: string,
    productId: string
}