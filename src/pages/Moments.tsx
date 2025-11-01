import { Image as ImageIcon, SortAsc, Clock, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MomentCard } from "@/components/moments/MomentCard";
import { MomentDetailModal } from "@/components/moments/MomentDetailModal";
import { mockMoments } from "@/types/moment";
import { useState } from "react";
import { MomentNFT } from "@/types/moment";

const Moments = () => {
  const [selectedMoment, setSelectedMoment] = useState<MomentNFT | null>(null);
  const [sortBy, setSortBy] = useState("recent");

  const sortedMoments = [...mockMoments].sort((a, b) => {
    if (sortBy === "recent") {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else if (sortBy === "liked") {
      return b.likes - a.likes;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
            My Moments Collection
          </h1>
          <p className="text-muted-foreground">
            Your minted transaction stories as unique NFTs
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="glass" className="gap-2">
              <SortAsc className="h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card border-primary/20">
            <DropdownMenuItem onClick={() => setSortBy("recent")} className="gap-2">
              <Clock className="h-4 w-4" />
              Most Recent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("liked")} className="gap-2">
              <Heart className="h-4 w-4" />
              Most Liked
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("protocol")} className="gap-2">
              <Zap className="h-4 w-4" />
              Protocol
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedMoments.map((moment) => (
          <MomentCard
            key={moment.id}
            moment={moment}
            onClick={() => setSelectedMoment(moment)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <MomentDetailModal
        moment={selectedMoment}
        onClose={() => setSelectedMoment(null)}
      />
    </div>
  );
};

export default Moments;
