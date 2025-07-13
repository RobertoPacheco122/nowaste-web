import React from "react";

import { Clock, MapPin, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface ProductProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export const Product = ({ children, className, ...rest }: ProductProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden  hover:shadow-lg transition-shadow pt-0",
        className
      )}
      {...rest}
    >
      {children}
    </Card>
  );
};

const ProductImage = ({ children, className, ...rest }: ProductProps) => {
  return (
    <div
      className={cn(
        "aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const ProductDiscountBadge = ({
  children,
  className,
  ...rest
}: ProductProps) => {
  return (
    <Badge
      className={cn(
        "bg-red-500 hover:bg-red-600 font-semibold rounded-lg text-xs",
        className
      )}
      {...rest}
    >
      {children}
    </Badge>
  );
};

const ProductHeader = ({ children, className, ...rest }: ProductProps) => {
  return (
    <CardHeader className={className} {...rest}>
      {children}
    </CardHeader>
  );
};

const ProductTitle = ({ children, className, ...rest }: ProductProps) => {
  return (
    <CardTitle className={cn("text-lg", className)} {...rest}>
      {children}
    </CardTitle>
  );
};

const ProductRating = ({ children, className, ...rest }: ProductProps) => {
  return (
    <div className="flex items-center space-x-1 text-sm" {...rest}>
      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      <span className={className}>{children}</span>
    </div>
  );
};

const SellerLocation = ({ children, className, ...rest }: ProductProps) => {
  return (
    <div className="flex items-center space-x-2">
      <MapPin className="h-4 w-4 text-gray-500" />
      <span className={cn("text-xs text-gray-500", className)} {...rest}>
        {children}
      </span>
    </div>
  );
};

const ProductContent = ({ children, className, ...rest }: ProductProps) => {
  return (
    <CardContent className={className} {...rest}>
      {children}
    </CardContent>
  );
};

const ProductPrice = ({ children, className, ...rest }: ProductProps) => {
  return (
    <span
      className={cn("text-2xl font-bold text-green-600", className)}
      {...rest}
    >
      {children}
    </span>
  );
};

const ProductOldPrice = ({ children, className, ...rest }: ProductProps) => {
  return (
    <span
      className={cn("text-sm text-gray-500 line-through", className)}
      {...rest}
    >
      {children}
    </span>
  );
};

const ProductExpiration = ({ children, className, ...rest }: ProductProps) => {
  return (
    <div className="flex items-center space-x-1">
      <Clock className="h-4 w-4 text-orange-600" />
      <span className={cn("text-sm text-orange-600", className)} {...rest}>
        {children}
      </span>
    </div>
  );
};

const ProductAddToCartButton = ({
  children,
  className,
  ...rest
}: React.ComponentProps<"button">) => {
  return (
    <Button className={className} {...rest}>
      {children}
    </Button>
  );
};

Product.Image = ProductImage;
Product.DiscountBadge = ProductDiscountBadge;
Product.Header = ProductHeader;
Product.Title = ProductTitle;
Product.SellerLocation = SellerLocation;
Product.Rating = ProductRating;
Product.Content = ProductContent;
Product.Price = ProductPrice;
Product.OldPrice = ProductOldPrice;
Product.Expiration = ProductExpiration;
Product.AddToCartButton = ProductAddToCartButton;
