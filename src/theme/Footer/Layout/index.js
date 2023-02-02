import React from "react";
import { Text, ActionIcon } from "@mantine/core";
import Link from "@docusaurus/Link";
import {
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

// TODO: Allow footer to support customization through docusaurus.config.js
export default function FooterLayout({ copyright }) {
  return (
    <footer className="border-slate-400 bg-zinc-100 py-12 shadow-inner dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Sponsors */}
        <div>
          <Text
            size="lg"
            weight={700}
            className="mx-auto mb-4 w-5/6 text-center dark:text-zinc-400 md:w-full"
          >
            Special thanks to our Ultimate and Platinum sponsors for powering
            our mission
          </Text>

          <div className="flex w-full flex-col items-center justify-evenly space-y-8 py-2 align-middle md:flex-row md:space-y-0">
            <Link to="https://www.jlg.com/">
              <img src="/img/sponsors/jlg.svg" alt="JLG" className="w-40" />
            </Link>
            <Link to="https://www.wellspan.org/">
              <img
                src="/img/sponsors/wellspan.png"
                alt="WellSpan Health"
                className="w-40 dark:hidden"
              />
              <img
                src="/img/sponsors/wellspan-reverse.png"
                alt="WellSpan Health"
                className="hidden w-40 dark:block"
              />
            </Link>
            <Link to="https://www.vfw1599.org/" className="!no-underline">
              <div className="flex flex-col items-center space-y-1">
                <img
                  src="/img/sponsors/vfw.png"
                  alt="Chambersburg VFW Post 1599"
                  className="w-40"
                />
                <Text color="dimmed" size="sm">
                  Chambersburg VFW Post 1599
                </Text>
              </div>
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="flex min-h-[160px] justify-between border-0 border-y border-solid border-slate-400 py-6 leading-9">
          <div className="mx-auto w-72 items-center leading-3 md:ml-0 md:max-w-[240px] md:items-start">
            <img
              src="/img/svg/logo-color-full.svg"
              className="w-full"
              alt="South Central STEM Collective logo"
            />
            <Text color="dimmed" size="sm">
              SC2 is 501(c)(3) non-profit focused on providing STEM
              opportunities for students in Franklin County PA.
            </Text>
          </div>

          {/* Links */}
          <div className="hidden justify-between md:flex">
            <div className="flex w-40 flex-col">
              <Text size="lg" weight={700} className="dark:text-zinc-400">
                Support us
              </Text>
              <Link to="/wiki/donations" className="text-gray">
                Donate
              </Link>
              <Link to="/wiki/donations/amazon-smile" className="text-gray">
                AmazonSmile
              </Link>
              <Link to="/sponsors" className="text-gray">
                Sponsors
              </Link>
            </div>
            <div className="flex w-40 flex-col">
              <Text size="lg" weight={700} className="dark:text-zinc-400">
                Find us online
              </Text>
              <Link to="https://go.scstem.tech/facebook" className="text-gray">
                Facebook
              </Link>
              <Link to="https://go.scstem.tech/linkedin" className="text-gray">
                LinkedIn
              </Link>
              <Link to="https://go.scstem.tech/github" className="text-gray">
                GitHub
              </Link>
            </div>
            <div className="flex w-40 flex-col">
              <Text size="lg" weight={700} className="dark:text-zinc-400">
                Member area
              </Text>
              <Link to="/team" className="text-gray">
                Team Login
              </Link>
              <Link to="https://go.scstem.tech/slack" className="text-gray">
                Slack
              </Link>
              <Link to="http://mail.scstem.org" className="text-gray">
                Gmail
              </Link>
              <Link to="http://drive.scstem.org" className="text-gray">
                Google Drive
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto flex w-80 flex-col items-center justify-between md:w-full md:flex-row">
          <Text color="dimmed" size="sm" className="text-center md:text-left">
            {copyright}
          </Text>
          <div className="flex justify-end">
            <ActionIcon
              component="a"
              href="mailto:info@scstem.org"
              size="lg"
              opacity={50}
            >
              <IconMail size={20} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              component="a"
              href="https://go.scstem.tech/facebook"
              size="lg"
              opacity={50}
            >
              <IconBrandFacebook size={20} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              component="a"
              href="https://go.scstem.tech/linkedin"
              size="lg"
              opacity={50}
            >
              <IconBrandLinkedin size={20} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              component="a"
              href="https://go.scstem.tech/github"
              size="lg"
              opacity={50}
            >
              <IconBrandGithub size={20} stroke={1.5} />
            </ActionIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
