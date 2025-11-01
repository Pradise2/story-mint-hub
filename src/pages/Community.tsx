import { Trophy, TrendingUp, Vote } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
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

        <TabsContent value="leaderboards">
          <div className="glass-card rounded-xl p-8 border border-primary/20 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-neon/20 mb-4">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Leaderboards Coming Soon</h3>
              <p className="text-muted-foreground">
                Compete with other users based on trading volume, moments minted, and
                community favorites. Rankings will be available once more users join the
                platform.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="glass-card rounded-xl p-8 border border-primary/20 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-neon/20 mb-4">
                <Vote className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Weekly Voting Coming Soon</h3>
              <p className="text-muted-foreground">
                Vote for the best transaction stories each week. The winning story will be
                featured and the creator will receive special recognition.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
