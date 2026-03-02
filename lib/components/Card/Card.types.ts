import { HTMLAttributes, ReactNode } from "react";

export type CardVariant =
    | "default"
    | "outlined"
    | "elevated"
    | "gradient"
    | "interactive";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    padding?: "none" | "sm" | "md" | "lg";
    rounded?: "none" | "sm" | "md" | "lg" | "xl";
    hover?: boolean;
    fullWidth?: boolean;
    children: ReactNode;
}

// Card Pre-configuradas
export interface ArticleCardProps {
    title: string;
    description: string;
    author?: string;
    date?: string;
    readTime?: string;
    image?: string;
    tags?: string[];
    onClick?: () => void;
}

export interface ImageCardProps {
    image: string;
    title: string;
    description?: string;
    overlay?: boolean;
    aspectRatio?: "square" | "video" | "portrait";
    onClick?: () => void;
}

export interface ProfileCardProps {
    name: string;
    role?: string;
    avatar?: string;
    email?: string;
    phone?: string;
    bio?: string;
    actions?: ReactNode;
}

export interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    trend?: "up" | "down" | "neutral";
    icon?: ReactNode;
    description?: string;
}

export interface ProductCardProps {
    name: string;
    price: number;
    image: string;
    description?: string;
    rating?: number;
    reviews?: number;
    inStock?: boolean;
    onAddToCart?: () => void;
}
