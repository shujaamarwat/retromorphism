import React from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { cn } from "../../lib/utils";

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  imageUrl,
  imageAlt,
  badge,
  badgeVariant = "default",
  primaryAction,
  secondaryAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white-100 border-2 border-[#001428] rounded-2xl overflow-hidden",
        "shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)]",
        "hover:shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.4)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1",
        "max-w-sm",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-48 object-cover"
        />
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant} className="shadow-sm">
              {badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-title-24-black text-black-100 text-lg leading-tight">
            {title}
          </h3>
          <p className="font-text-16-med text-black-60 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        {(primaryAction || secondaryAction) && (
          <div className="flex gap-3 pt-2">
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                size="sm"
                className="flex-1"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};