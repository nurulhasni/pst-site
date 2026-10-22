"use client";

import { useState } from "react";
import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { StoryItem } from "@/components/sections/StoryItem";
import { useLanguage } from "@/components/LanguageProvider";
import { localize } from "@/lib/sheetI18n";
import type { CustomerStories } from "@/lib/sheets";

type StoryStackProps = {
  featured: CustomerStories["featured"];
  stories: CustomerStories["stories"];
};

export function StoryStack({ featured, stories }: StoryStackProps) {
  const { lang } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>("featured");
  const l = (text: string) => localize(text, lang);

  function toggle(key: string) {
    setOpenKey(openKey === key ? null : key);
  }

  return (
    <>
      <FeaturedStory
        title={l(featured.title)}
        body={l(featured.body)}
        quote={l(featured.quote)}
        quoteAuthor={l(featured.quoteAuthor)}
        url={featured.url}
        open={openKey === "featured"}
        onToggle={() => toggle("featured")}
      />
      {stories.map((story) => (
        <StoryItem
          key={story.title}
          title={l(story.title)}
          meta={l(story.meta)}
          url={story.url}
          body={story.body ? l(story.body) : undefined}
          quote={story.quote ? l(story.quote) : undefined}
          quoteAuthor={story.quoteAuthor ? l(story.quoteAuthor) : undefined}
          open={openKey === story.title}
          onToggle={() => toggle(story.title)}
        />
      ))}
    </>
  );
}
