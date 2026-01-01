export interface User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin';
    created_at: Date;
}

export interface Toy {
    id: number;
    title: string;
    description: string;
    category: string;
    condition: 'new' | 'used';
    status: 'pending' | 'available' | 'donated';
    image_url: string;
    user_id: number;
    created_at: Date;
}