"use client";

import React, { createContext, useContext } from "react";
import { homeDefaults, type HomeContent } from "@/lib/cms/content/defaults/home";
import { companyDefaults, type CompanyContent } from "@/lib/cms/content/defaults/site";

interface HomeContentValue {
  content: HomeContent;
  company: CompanyContent;
}

const HomeContentContext = createContext<HomeContentValue>({ content: homeDefaults, company: companyDefaults });

/** Supplies CMS-managed homepage copy to the (client-side) homepage sections. */
export function HomeContentProvider({ value, children }: { value: HomeContentValue; children: React.ReactNode }) {
  return <HomeContentContext.Provider value={value}>{children}</HomeContentContext.Provider>;
}

export function useHomeContent() {
  return useContext(HomeContentContext);
}

export { telHref } from "@/lib/utils";
