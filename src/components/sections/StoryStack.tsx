"use client";

import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { StoryItem } from "@/components/sections/StoryItem";
import type { PublicStory } from "@/lib/storyModel";

type StoryStackProps = {
  // Already in the visitor's language
  featured: PublicStory;
  stories: PublicStory[];
  openKey: string | null;
  onToggle: (key: string) => void;
};

export function StoryStack({ featured, stories, openKey, onToggle }: StoryStackProps) {
  return (
    <>
      <FeaturedStory
        title={featured.title}
        body={featured.body}
        quote={featured.quote}
        quoteAuthor={featured.quoteAuthor}
        url={featured.url}
        open={openKey === featured.key}
        onToggle={() => onToggle(featured.key)}
      />
      {stories.map((story) => (
        <StoryItem
          key={story.key}
          title={story.title}
          meta={story.meta}
          url={story.url}
          body={story.body || undefined}
          quote={story.quote || undefined}
          quoteAuthor={story.quoteAuthor || undefined}
          open={openKey === story.key}
          onToggle={() => onToggle(story.key)}
        />
      ))}
    </>
  );
}
