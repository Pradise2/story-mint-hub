import { Image as ImageIcon, Sparkles } from "lucide-react";

const Moments = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
          My Moments Collection
        </h1>
        <p className="text-muted-foreground">
          Your minted transaction stories as unique NFTs
        </p>
      </div>

      {/* Empty State */}
      <div className="glass-card rounded-xl p-12 border border-primary/20 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-neon/20 mb-4">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold">No Moments Yet</h3>
          <p className="text-muted-foreground">
            Mint your first transaction story as an NFT to start your collection. Each
            moment becomes a unique digital artifact of your crypto journey.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary pt-4">
            <Sparkles className="h-4 w-4" />
            <span>Visit the Story Feed to mint your first moment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moments;
