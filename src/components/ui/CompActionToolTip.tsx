"use client";
import React, { useState } from "react";
import {
    TooltipProvider,
} from "@/components/ui/ToolTip.tsx";

// Tooltip 대신 직접 구현된 trigger 역할
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import { useClick, useHover, useDismiss, useInteractions } from '@floating-ui/react';

interface ActionTooltipProps {
    component: React.ReactNode;
    children: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}

export const CompActionTooltip: React.FC<ActionTooltipProps> = ({
                                                                    component,
                                                                    children,
                                                                    side = 'top',
                                                                    align = 'center',
                                                                }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: `${side}${align !== 'center' ? `-${align}` : ''}` as any,
    });

    const click = useClick(context, {
        enabled: true,
        toggle: true,
        event: 'click',
    });

    const hover = useHover(context, {
        enabled: !isPinned,
        move: false,
    });

    const dismiss = useDismiss(context, {
        outsidePress: !isPinned,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        click,
        dismiss,
    ]);

    const handleClick = () => {
        setIsPinned(prev => !prev);
    };

    return (
        <TooltipProvider>
            <div
                ref={refs.setReference}
                {...getReferenceProps({
                    onClick: handleClick,
                    className: 'cursor-pointer',
                })}
            >
                {children}
            </div>
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps({
                        className:
                            'z-50 shadow-lg',
                    })}
                >
                    {component}
                </div>
            )}
        </TooltipProvider>
    );
};
