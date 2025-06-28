import React from "react";
import { Button } from "./button";
import { Badge } from "./badge";

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
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
}) => {
  return (
    <div className="bg-white-100 border-2 border-[#001428] rounded-2xl shadow-[0_4px_0_#001428,0_6px_12px_rgba(0,20,40,0.2)] overflow-hidden transition-all duration-200 hover:shadow-[0_6px_0_#001428,0_8px_16px_rgba(0,20,40,0.3)] hover:-translate-y-1">
      {/* Image Section */}
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={badgeVariant}>{badge}</Badge>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className="font-title-16-black text-black-100 text-lg leading-tight">
            {title}
          </h3>
          <p className="font-text-16-med text-black-60 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                className="flex-1 sm:flex-none"
                size="sm"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="outline"
                className="flex-1 sm:flex-none"
                size="sm"
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