"use client";

import {
  IconChevronDown,
  IconLego,
  IconMenu2,
  IconRobot,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { LinkButton } from "@/components/LinkButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LogoColor } from "./Logo";

type NavLink = {
  href: string;
  label: string;
  element?: ReactNode;
  icon?: ReactNode;
  description?: string;
  children?: NavLink[];
};

const links: NavLink[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Sponsors",
    href: "/sponsors",
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "FLL",
        element: (
          <>
            <i>FIRST</i>® Lego League
          </>
        ),
        href: "/programs/fll",
        icon: <IconLego />,
        description: "A Hands-On Approach to STEM Learning",
      },
      {
        label: "FRC",
        element: (
          <>
            <i>FIRST</i>® Robotics Competition
          </>
        ),
        href: "/programs/frc",
        icon: <IconRobot />,
        description:
          "Combining the excitement of sport with the rigors of science and technology",
      },
    ],
  },
  {
    label: "Donate",
    href: "/donate",
  },
];

function keyify(link: NavLink): string {
  return link.label.toLowerCase().replace(/ /g, "_");
}

function GetInvolved({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}): ReactNode {
  return (
    <LinkButton
      href="/get-involved"
      className={cn("shadow-lg w-full", className)}
      onClick={onClick}
    >
      Get Involved
    </LinkButton>
  );
}

export function Navbar(): ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = useCallback(
    (link: NavLink): boolean => pathname.startsWith(link.href),
    [pathname],
  );

  const onMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 h-16 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-full gap-4">
        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-foreground p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* Brand */}
        <Link href="/" className="flex items-center gap-x-2 shrink-0">
          <div className="max-h-12.5 aspect-square shrink-0">
            <LogoColor className="size-full object-contain" />
          </div>
          <div className="font-bold w-36 lg:w-full whitespace-normal text-foreground flex-1">
            South Central STEM Collective
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-4 mx-auto h-full">
          {links.map((link) => (
            <div
              key={keyify(link)}
              className="relative flex items-center h-full"
            >
              {!link.children ? (
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className={cn(
                    "relative flex items-center h-full px-2 text-sm transition-colors",
                    isActive(link)
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {link.element ?? link.label}
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      "relative flex items-center h-full gap-1 px-2 text-sm transition-colors outline-none",
                      isActive(link)
                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-primary"
                        : "text-foreground hover:text-primary",
                    )}
                  >
                    {link.element ?? link.label}
                    <IconChevronDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80" align="start">
                    {link.children.map((child) => (
                      <DropdownMenuItem
                        key={keyify(child)}
                        asChild
                        className={cn(
                          "py-3",
                          isActive(child)
                            ? "border-l-2 border-primary text-primary"
                            : null,
                        )}
                      >
                        <Link href={child.href}>
                          <div className="shrink-0">{child.icon}</div>
                          <div className="flex flex-col gap-1">
                            <div className="font-medium">
                              {child.element ?? child.label}
                            </div>
                            {child.description && (
                              <div className="text-xs text-muted-foreground text-wrap">
                                {child.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center ml-auto">
          <GetInvolved />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <div className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <div key={keyify(link)}>
                {!link.children ? (
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className={cn(
                      "block py-2 text-lg transition-colors",
                      isActive(link) ? "text-primary" : "text-foreground",
                    )}
                    onClick={onMenuItemClick}
                  >
                    {link.element ?? link.label}
                  </Link>
                ) : (
                  <details open={isActive(link) || undefined}>
                    <summary
                      className={cn(
                        "py-2 text-lg cursor-pointer list-none flex items-center justify-between",
                        isActive(link) ? "text-primary" : "text-foreground",
                      )}
                    >
                      {link.label}
                      <IconChevronDown
                        size={16}
                        className="transition-transform [[open]>&]:rotate-180"
                      />
                    </summary>
                    <div className="flex flex-col gap-2 pl-4 pb-2">
                      {link.children.map((child) => (
                        <Link
                          key={keyify(child)}
                          href={child.href}
                          aria-label={child.label}
                          className={cn(
                            "py-1 transition-colors",
                            isActive(child)
                              ? "text-primary"
                              : "text-foreground",
                          )}
                          onClick={onMenuItemClick}
                        >
                          {child.element ?? child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            ))}
            <div className="mt-4 mb-4">
              <GetInvolved onClick={onMenuItemClick} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
