"use client";

import type { ButtonProps } from "@heroui/react";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar as NUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { IconChevronDown, IconLego, IconRobot } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

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
  href: _href,
  as: _as,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <Button
      as={Link}
      color="primary"
      href="/get-involved"
      variant="shadow"
      fullWidth
      className={cn(className)}
      {...props}
    >
      Get Involved
    </Button>
  );
}

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = useCallback(
    (link: NavLink): boolean => pathname.startsWith(link.href),
    [pathname],
  );

  const onMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const navButtons = links.map((link) => (
    <NavbarItem key={keyify(link)} isActive={isActive(link)}>
      {!link.children ? (
        <Link href={link.href} aria-label={link.label} className="text-inherit">
          {link.element ?? link.label}
        </Link>
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <div className="flex gap-2 cursor-pointer">
              <div>{link.element ? link.element : link.label}</div>
              <IconChevronDown />
            </div>
          </DropdownTrigger>

          <DropdownMenu
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
            aria-label={link.label}
          >
            {link.children.map((link) => (
              <DropdownItem
                key={keyify(link)}
                startContent={link.icon}
                description={link.description}
                textValue={link.label}
                href={link.href}
                className={cn(
                  isActive(link) ? "border-x-2 border-primary" : null,
                )}
              >
                {link.element ? link.element : link.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </NavbarItem>
  ));

  const menuButtons = links.map((link) => (
    <NavbarMenuItem key={keyify(link)}>
      {!link.children ? (
        <Link
          href={link.href}
          size="lg"
          aria-label={link.label}
          color={isActive(link) ? "primary" : "foreground"}
          onClick={onMenuItemClick}
        >
          {link.element ?? link.label}
        </Link>
      ) : (
        <div className="[&>*]:p-0">
          <Accordion selectedKeys={isActive(link) ? "all" : undefined}>
            <AccordionItem
              aria-label={link.label}
              title={link.label}
              classNames={{
                trigger: "p-0",
                content: "flex flex-col gap-2 pl-2",
                indicator: "text-foreground",
                title: cn(isActive(link) ? "text-primary" : null),
              }}
            >
              {link.children.map((link) => (
                <Link
                  key={keyify(link)}
                  href={link.href}
                  aria-label={link.label}
                  color={isActive(link) ? "primary" : "foreground"}
                  onClick={onMenuItemClick}
                >
                  {link.element ?? link.label}
                </Link>
              ))}
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </NavbarMenuItem>
  ));

  return (
    <NUINavbar
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "text-foreground",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
          "data-[active=true]:text-primary",
        ],
      }}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand className="gap-x-2" as={Link} href="/">
        <LogoColor className="max-h-[50px]" />
        <div className="font-bold w-36 lg:w-full whitespace-normal text-foreground">
          South Central STEM Collective
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navButtons}
      </NavbarContent>
      <NavbarContent justify="end" className="hidden lg:flex">
        <NavbarItem>
          <GetInvolved />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="max-h-[calc(100dvh-4rem)]">
        {menuButtons}
        <NavbarMenuItem className="mt-auto mb-4">
          <GetInvolved
            className="text-[16px]"
            variant="solid"
            onClick={onMenuItemClick}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </NUINavbar>
  );
}
