import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StoryCard } from "./StoryCard";
import { mockStories } from "@/types/story";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const filterOptions = ["All", "Swaps", "Mints", "Staking", "DeFi", "NFTs"];

export const StoryFeed = () => {
  const [stories, setStories] = useState(mockStories);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const STORIES_PER_PAGE = 3;
  const MAX_PAGES = 3;

  const handleLike = (id: string) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id
          ? {
              ...story,
              isLiked: !story.isLiked,
              likes: story.isLiked ? story.likes - 1 : story.likes + 1,
            }
          : story,
      ),
    );
  };

  const handleShare = (id: string) => {
    const story = stories.find((s) => s.id === id);
    if (story) {
      navigator.clipboard.writeText(
        `Check out my crypto story: ${window.location.origin}/story/${id}`,
      );
      toast.success("Story link copied to clipboard!");
    }
  };

  const handleMint = (id: string) => {
    toast.success("Minting feature coming soon! Connect Lovable Cloud to enable NFT minting.");
  };

  // Pagination Logic
  const totalPages = Math.min(MAX_PAGES, Math.ceil(stories.length / STORIES_PER_PAGE));
  const currentStories = stories.slice(
    (currentPage - 1) * STORIES_PER_PAGE,
    currentPage * STORIES_PER_PAGE,
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Feed Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
            Your Crypto Story
          </h1>
          <p className="text-muted-foreground">
            Every transaction tells a tale. Discover yours.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="glass-card rounded-lg p-4 border border-primary/20 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for a token, protocol, or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>
            <Button variant="glass" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Toggles */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "glass"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? "shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : ""
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="space-y-6">
        {currentStories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onLike={handleLike}
            onShare={handleShare}
            onMint={handleMint}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};