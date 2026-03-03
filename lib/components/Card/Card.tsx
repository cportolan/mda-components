"use client";

import React from "react";
import {
    CardProps,
    ArticleCardProps,
    ImageCardProps,
    ProfileCardProps,
    StatsCardProps,
    ProductCardProps,
} from "./Card.types";

// Card Base
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = "default",
            padding = "md",
            rounded = "lg",
            hover = false,
            fullWidth = false,
            className = "",
            children,
            ...props
        },
        ref,
    ) => {
        const baseStyles = "transition-all duration-300";

        const variants = {
            default: "bg-white border border-green-200/60 shadow-md",
            outlined: "bg-transparent border-2 border-[#83c442]",
            elevated: "bg-white shadow-lg hover:shadow-xl",
            gradient:
                "bg-gradient-to-br from-green-50/80 to-[#83c442]/10 border border-green-300/60",
            interactive:
                "bg-white border border-green-200/60 shadow-md hover:shadow-xl hover:scale-[1.02] cursor-pointer",
        };

        const paddings = {
            none: "p-0",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
        };

        const roundeds = {
            none: "rounded-none",
            sm: "rounded-lg",
            md: "rounded-xl",
            lg: "rounded-2xl",
            xl: "rounded-3xl",
        };

        const hoverStyles =
            hover && variant !== "interactive"
                ? "hover:shadow-xl hover:-translate-y-1"
                : "";

        const widthClass = fullWidth ? "w-full" : "";

        const cardClasses = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${roundeds[rounded]} ${hoverStyles} ${widthClass} ${className}`;

        return (
            <div ref={ref} className={cardClasses} {...props}>
                {children}
            </div>
        );
    },
);

Card.displayName = "Card";

// 1. Article Card
export const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    description,
    author,
    date,
    readTime,
    image,
    tags = [],
    onClick,
}) => {
    return (
        <Card
            variant="interactive"
            padding="none"
            onClick={onClick}
            className="overflow-hidden"
        >
            {image && (
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                </div>
            )}
            <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-[#83c442]/10 px-3 py-1 text-xs font-medium text-[#5a9428]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#3f3f3f] hover:text-[#83c442] transition-colors">
                    {title}
                </h3>
                <p className="mb-4 text-[15px] text-[#3f3f3f]/70 line-clamp-3">
                    {description}
                </p>
                <div className="flex items-center justify-between border-t border-green-200/60 pt-4 text-sm text-[#3f3f3f]/60">
                    <div className="flex items-center gap-2">
                        {author && (
                            <span className="font-medium">{author}</span>
                        )}
                        {date && <span>•</span>}
                        {date && <span>{date}</span>}
                    </div>
                    {readTime && (
                        <span className="flex items-center gap-1">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M12 6V12L16 14"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {readTime}
                        </span>
                    )}
                </div>
            </div>
        </Card>
    );
};

ArticleCard.displayName = "ArticleCard";

// 2. Image Card
export const ImageCard: React.FC<ImageCardProps> = ({
    image,
    title,
    description,
    overlay = true,
    aspectRatio = "video",
    onClick,
}) => {
    const aspectRatios = {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
    };

    return (
        <Card
            variant="interactive"
            padding="none"
            onClick={onClick}
            className="overflow-hidden group"
        >
            <div
                className={`relative w-full ${aspectRatios[aspectRatio]} overflow-hidden`}
            >
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {overlay && (
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="mb-2 text-2xl font-bold">{title}</h3>
                            {description && (
                                <p className="text-sm text-white/90">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {!overlay && (
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#3f3f3f]">
                        {title}
                    </h3>
                    {description && (
                        <p className="mt-1 text-sm text-[#3f3f3f]/70">
                            {description}
                        </p>
                    )}
                </div>
            )}
        </Card>
    );
};

ImageCard.displayName = "ImageCard";

// 3. Profile Card
export const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    role,
    avatar,
    email,
    phone,
    bio,
    actions,
}) => {
    return (
        <Card variant="elevated" padding="lg" className="text-center">
            <div className="mb-6 flex justify-center">
                {avatar ? (
                    <img
                        src={avatar}
                        alt={name}
                        className="h-24 w-24 rounded-full border-4 border-[#83c442]/20 object-cover shadow-lg"
                    />
                ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#83c442]/20 bg-[#83c442]/10 text-3xl font-bold text-[#83c442] shadow-lg">
                        {name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            <h3 className="mb-1 text-2xl font-bold text-[#3f3f3f]">{name}</h3>
            {role && (
                <p className="mb-4 text-[15px] font-medium text-[#83c442]">
                    {role}
                </p>
            )}
            {bio && <p className="mb-6 text-sm text-[#3f3f3f]/70">{bio}</p>}
            {(email || phone) && (
                <div className="mb-6 space-y-2 border-t border-green-200/60 pt-6">
                    {email && (
                        <div className="flex items-center justify-center gap-2 text-sm text-[#3f3f3f]/70">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M22 6l-10 7L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                            {email}
                        </div>
                    )}
                    {phone && (
                        <div className="flex items-center justify-center gap-2 text-sm text-[#3f3f3f]/70">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                            {phone}
                        </div>
                    )}
                </div>
            )}
            {actions && <div>{actions}</div>}
        </Card>
    );
};

ProfileCard.displayName = "ProfileCard";

// 4. Stats Card
export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    change,
    trend = "neutral",
    icon,
    description,
}) => {
    const trendColors = {
        up: "text-green-600",
        down: "text-red-600",
        neutral: "text-[#3f3f3f]/60",
    };

    const trendIcons = {
        up: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 19V5M5 12l7-7 7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        down: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 5v14M19 12l-7 7-7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        neutral: null,
    };

    return (
        <Card variant="default" hover>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="mb-1 text-sm font-medium text-[#3f3f3f]/60">
                        {title}
                    </p>
                    <p className="mb-2 text-3xl font-bold text-[#3f3f3f]">
                        {value}
                    </p>
                    {change !== undefined && (
                        <div
                            className={`flex items-center gap-1 text-sm font-medium ${trendColors[trend]}`}
                        >
                            {trendIcons[trend]}
                            <span>{change}%</span>
                        </div>
                    )}
                    {description && (
                        <p className="mt-2 text-xs text-[#3f3f3f]/60">
                            {description}
                        </p>
                    )}
                </div>
                {icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#83c442]/10 text-[#83c442]">
                        {icon}
                    </div>
                )}
            </div>
        </Card>
    );
};

StatsCard.displayName = "StatsCard";

// 5. Product Card
export const ProductCard: React.FC<ProductCardProps> = ({
    name,
    price,
    image,
    description,
    rating = 0,
    reviews = 0,
    inStock = true,
    onAddToCart,
}) => {
    return (
        <Card variant="interactive" padding="none" className="overflow-hidden">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {!inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
                            Agotado
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-[#3f3f3f] line-clamp-2">
                    {name}
                </h3>
                {description && (
                    <p className="mb-3 text-sm text-[#3f3f3f]/70 line-clamp-2">
                        {description}
                    </p>
                )}
                {rating > 0 && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill={i < rating ? "#83c442" : "none"}
                                    stroke="#83c442"
                                    strokeWidth="2"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        {reviews > 0 && (
                            <span className="text-xs text-[#3f3f3f]/60">
                                ({reviews})
                            </span>
                        )}
                    </div>
                )}
                <div className="flex items-center justify-between border-t border-green-200/60 pt-4">
                    <span className="text-2xl font-bold text-[#83c442]">
                        ${price.toLocaleString()}
                    </span>
                    {inStock && onAddToCart && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart();
                            }}
                            className="rounded-lg bg-[#83c442] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#6fb035] active:scale-95"
                        >
                            Agregar
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

ProductCard.displayName = "ProductCard";
