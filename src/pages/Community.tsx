import { Trophy, Vote } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tabs as SubTabs,
  TabsContent as SubTabsContent,
  TabsList as SubTabsList,
  TabsTrigger as SubTabsTrigger,
} from "@/components/ui/tabs";
import { LeaderboardTable } from "@/components/community/LeaderboardTable";
import { WeeklyVoting } from "@/components/community/WeeklyVoting";
import {
  mockLeaderboardTraders,
  mockLeaderboardCollectors,
  mockLeaderboardFavorites,
  mockWeeklyStories,
} from "@/types/community";
import { useState } from "react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Community = () => {
  const [weeklyStories, setWeeklyStories] = useState(mockWeeklyStories);

  // Pagination states
  const [tradersPage, setTradersPage] = useState(1);
  const [collectorsPage, setCollectorsPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [votingPage, setVotingPage] = useState(1);

  const ITEMS_PER_PAGE = 3;
  const MAX_PAGES = 3;

  const handleViewStory = (storyId: string) => {
    toast.info("Story view coming soon!");
  };

  const handleVote = (storyId: string) => {
    setWeeklyStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? { ...story, hasVoted: true, votes: story.votes + 1 }
          : story,
      ),
    );
  };

  // Memoize paginated data to avoid re-calculating on every render
  const paginatedData = (data: any[], currentPage: number) => {
    const totalPages = Math.min(MAX_PAGES, Math.ceil(data.length / ITEMS_PER_PAGE));
    const paginatedItems = data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
    return { totalPages, paginatedItems };
  };

  const tradersData = paginatedData(mockLeaderboardTraders, tradersPage);
  const collectorsData = paginatedData(mockLeaderboardCollectors, collectorsPage);
  const favoritesData = paginatedData(mockLeaderboardFavorites, favoritesPage);
  const votingData = paginatedData(weeklyStories, votingPage);

  const renderPagination = (totalPages: number, currentPage: number, setCurrentPage: (page: number) => void) => {
    if (totalPages <= 1) return null;
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(Math.max(currentPage - 1, 1));
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
                setCurrentPage(Math.min(currentPage + 1, totalPages));
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          Community Hub
        </h1>
        <p className="text-muted-foreground">
          Compete, vote, and discover the best crypto stories
        </p>
      </div>

      <Tabs defaultValue="leaderboards" className="space-y-6">
        <TabsList className="glass-card border-primary/20">
          <TabsTrigger value="leaderboards" className="gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboards
          </TabsTrigger>
          <TabsTrigger value="weekly" className="gap-2">
            <Vote className="h-4 w-4" />
            Story of the Week
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboards" className="space-y-6">
          <SubTabs defaultValue="traders">
            <SubTabsList className="glass-card border-primary/20 mb-6">
              <SubTabsTrigger value="traders">Top Traders</SubTabsTrigger>
              <SubTabsTrigger value="collectors">Top Collectors</SubTabsTrigger>
              <SubTabsTrigger value="favorites">Community Favorites</SubTabsTrigger>
            </SubTabsList>

            <SubTabsContent value="traders">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Top Traders by Volume</h3>
                  <p className="text-sm text-muted-foreground">
                    Ranked by total transaction volume across all protocols
                  </p>
                </div>
                <LeaderboardTable
                  entries={tradersData.paginatedItems}
                  onViewStory={handleViewStory}
                />
                {renderPagination(tradersData.totalPages, tradersPage, setTradersPage)}
              </div>
            </SubTabsContent>

            <SubTabsContent value="collectors">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Top Collectors by Moments</h3>
                  <p className="text-sm text-muted-foreground">
                    Users who have minted the most Story NFTs
                  </p>
                </div>
                <LeaderboardTable
                  entries={collectorsData.paginatedItems}
                  onViewStory={handleViewStory}
                />
                {renderPagination(collectorsData.totalPages, collectorsPage, setCollectorsPage)}
              </div>
            </SubTabsContent>

            <SubTabsContent value="favorites">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Favorites by Likes</h3>
                  <p className="text-sm text-muted-foreground">
                    The most loved stories in the community
                  </p>
                </div>
                <LeaderboardTable
                  entries={favoritesData.paginatedItems}
                  onViewStory={handleViewStory}
                />
                {renderPagination(favoritesData.totalPages, favoritesPage, setFavoritesPage)}
              </div>
            </SubTabsContent>
          </SubTabs>
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyVoting stories={votingData.paginatedItems} onVote={handleVote} />
          {renderPagination(votingData.totalPages, votingPage, setVotingPage)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;