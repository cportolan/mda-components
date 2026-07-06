"use client";
import "./Card.css";
import React from "react";

export const Card = React.forwardRef(({ variant = "default", padding = "md", rounded = "lg", hover = false, fullWidth = false, className = "", children, ...props }, ref) => {
    const classes = [
        "mda-card",
        `mda-card--${variant}`,
        `mda-card--padding-${padding}`,
        `mda-card--rounded-${rounded}`,
        hover && variant !== "interactive" ? "mda-card--hover" : "",
        fullWidth ? "mda-card--full" : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <div ref={ref} className={classes} {...props}>
            {children}
        </div>
    );
});

Card.displayName = "Card";

export const ArticleCard = ({ title, description, author, date, readTime, image, tags = [], onClick, }) => {
    return (
        <Card variant="interactive" padding="none" onClick={onClick} className="mda-article-card">
            {image && (
                <div className="mda-article-card__media">
                    <img src={image} alt={title} className="mda-article-card__image" />
                </div>
            )}

            <div className="mda-article-card__body">
                <div className="mda-article-card__tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="mda-article-card__tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="mda-article-card__title">{title}</h3>
                <p className="mda-article-card__description">{description}</p>

                <div className="mda-article-card__meta">
                    <div className="mda-article-card__meta-main">
                        {author && <span className="mda-article-card__author">{author}</span>}
                        {date && <span>•</span>}
                        {date && <span>{date}</span>}
                    </div>

                    {readTime && (
                        <span className="mda-article-card__read-time">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

export const ImageCard = ({ image, title, description, overlay = true, aspectRatio = "video", onClick, }) => {
    return (
        <Card variant="interactive" padding="none" onClick={onClick} className="mda-image-card">
            <div className={["mda-image-card__frame", `mda-image-card__frame--${aspectRatio}`].join(" ")}>
                <img src={image} alt={title} className="mda-image-card__image" />

                {overlay && (
                    <div className="mda-image-card__overlay">
                        <div className="mda-image-card__overlay-content">
                            <h3 className="mda-image-card__overlay-title">{title}</h3>
                            {description && <p className="mda-image-card__overlay-description">{description}</p>}
                        </div>
                    </div>
                )}
            </div>

            {!overlay && (
                <div className="mda-image-card__body">
                    <h3 className="mda-image-card__title">{title}</h3>
                    {description && <p className="mda-image-card__description">{description}</p>}
                </div>
            )}
        </Card>
    );
};

ImageCard.displayName = "ImageCard";

export const ProfileCard = ({ name, role, avatar, email, phone, bio, actions, }) => {
    return (
        <Card variant="elevated" padding="lg" className="mda-profile-card">
            <div className="mda-profile-card__avatar-wrap">
                {avatar ? (
                    <img src={avatar} alt={name} className="mda-profile-card__avatar" />
                ) : (
                    <div className="mda-profile-card__avatar-placeholder">
                        {name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <h3 className="mda-profile-card__name">{name}</h3>
            {role && <p className="mda-profile-card__role">{role}</p>}
            {bio && <p className="mda-profile-card__bio">{bio}</p>}

            {(email || phone) && (
                <div className="mda-profile-card__contact">
                    {email && (
                        <div className="mda-profile-card__contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" />
                                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            {email}
                        </div>
                    )}

                    {phone && (
                        <div className="mda-profile-card__contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            {phone}
                        </div>
                    )}
                </div>
            )}

            {actions && <div className="mda-profile-card__actions">{actions}</div>}
        </Card>
    );
};

ProfileCard.displayName = "ProfileCard";

export const StatsCard = ({ title, value, change, trend = "neutral", icon, description, }) => {
    const trendColors = {
        up: "mda-stats-card__trend--up",
        down: "mda-stats-card__trend--down",
        neutral: "mda-stats-card__trend--neutral",
    };

    const trendIcons = {
        up: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        down: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        neutral: null,
    };

    return (
        <Card variant="default" hover className="mda-stats-card">
            <div className="mda-stats-card__layout">
                <div className="mda-stats-card__content">
                    <p className="mda-stats-card__title">{title}</p>
                    <p className="mda-stats-card__value">{value}</p>

                    {change !== undefined && (
                        <div className={["mda-stats-card__trend", trendColors[trend]].join(" ")}>
                            {trendIcons[trend]}
                            <span>{change}%</span>
                        </div>
                    )}

                    {description && <p className="mda-stats-card__description">{description}</p>}
                </div>

                {icon && <div className="mda-stats-card__icon">{icon}</div>}
            </div>
        </Card>
    );
};

StatsCard.displayName = "StatsCard";

export const ProductCard = ({ name, price, image, description, rating = 0, reviews = 0, inStock = true, onAddToCart, }) => {
    return (
        <Card variant="interactive" padding="none" className="mda-product-card">
            <div className="mda-product-card__media">
                <img src={image} alt={name} className="mda-product-card__image" />

                {!inStock && (
                    <div className="mda-product-card__sold-out">
                        <span className="mda-product-card__sold-out-badge">Agotado</span>
                    </div>
                )}
            </div>

            <div className="mda-product-card__body">
                <h3 className="mda-product-card__name">{name}</h3>

                {description && <p className="mda-product-card__description">{description}</p>}

                {rating > 0 && (
                    <div className="mda-product-card__rating">
                        <div className="mda-product-card__stars">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "#83c442" : "none"} stroke="#83c442" strokeWidth="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>

                        {reviews > 0 && <span className="mda-product-card__reviews">({reviews})</span>}
                    </div>
                )}

                <div className="mda-product-card__footer">
                    <span className="mda-product-card__price">${price.toLocaleString()}</span>

                    {inStock && onAddToCart && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart();
                            }}
                            className="mda-product-card__button"
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
