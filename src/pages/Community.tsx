import { Trophy, TrendingUp, Vote } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs as SubTabs, TabsContent as SubTabsContent, TabsList as SubTabsList, TabsTrigger as SubTabsTrigger } from "@/components/ui/tabs";
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

const Community = () => {
  const [weeklyStories, setWeeklyStories] = useState(mockWeeklyStories);

  const handleViewStory = (storyId: string) => {
    toast.info("Story view coming soon!");
  };

  const handleVote = (storyId: string) => {
    setWeeklyStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? { ...story, hasVoted: true, votes: story.votes + 1 }
          : story
      )
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
                  entries={mockLeaderboardTraders}
                  onViewStory={handleViewStory}
                />
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
                  entries={mockLeaderboardCollectors}
                  onViewStory={handleViewStory}
                />
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
                  entries={mockLeaderboardFavorites}
                  onViewStory={handleViewStory}
                />
              </div>
            </SubTabsContent>
          </SubTabs>
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyVoting stories={weeklyStories} onVote={handleVote} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
