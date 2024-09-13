"use client";

import { Fragment } from "react";

import { ColorSchemeScript, MantineProvider as Mantine } from "@mantine/core";

import type { ProviderProps } from "@/types/provider";

import "@mantine/core/styles.css";

export const MantineProvider = ({ children }: ProviderProps) => (
  <Fragment>
    <ColorSchemeScript defaultColorScheme="light" />
    <Mantine defaultColorScheme="light" theme={{ respectReducedMotion: true }}>
      {children}
    </Mantine>
  </Fragment>
);
