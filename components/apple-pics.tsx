import { getHome, getImages } from "@/actions/home";
import type {XVideosResponse, YouPornResponse}  from "@/actions/home";
import * as React from "react";
import { ListMusic, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../components/ui/context-menu";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import Link from "next/link";



// Define types for API responses
interface Album {
  name: string;
  artist: string;
  cover: string;
  id: number;
}

interface Feed {
  id: number;
  name: string;
  artist: string;
  cover: string;
}

interface HomeResponse {
  data: {
    feed: Feed;
    id: number;
  }[];
}


async function MadeForYou() {
  const homeData: XVideosResponse | null = await getHome();
  const imageData: YouPornResponse | null = await getImages();

  if (!homeData || !imageData) {
    return <p>No data available</p>;
  }

  // Ensure 'data' is an array
  const madeForYouAlbums: Feed[] = homeData.data.map((item) => item.feed);
  // Ensure 'assets' is an array
  const imageItems: string[] = imageData.assets;

  console.log('madeForYouAlbums:', madeForYouAlbums);
  console.log('imageItems:', imageItems);

  return (
    <div className="flex min-h-full flex-col font-sans text-zinc-900 bg-zinc-50 dark:text-zinc-100 dark:bg-black">
      <div className="text-center">
        {/* Header or other content here */}
      </div>

      <section>
        <div className="max-w-screen-3xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <section className="rounded-md bg-white dark:bg-gray-950 shadow-lg p-4">
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your personal playlists. Updated daily.</p>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <DemoIndicator className="top-32 right-auto left-16 z-30" />
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {madeForYouAlbums.map((album) => (
                    <AlbumArtwork key={album.id} album={album} className="w-[150px]" aspectRatio={1 / 1} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <Separator className="my-4" />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight">Image Gallery</h2>
              <ScrollArea className="mt-4">
                <div className="flex space-x-4 pb-4">
                  {imageItems.map((image, index) => (
                    <div key={index} className="w-[150px]">
                      <img src={image} alt={`Image ${index}`} className="object-cover transition-all hover:scale-105" />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </section>

          <div className="text-center mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            Cta Banner
            {/* Additional content here */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MadeForYou;

interface DemoIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function DemoIndicator({ className }: DemoIndicatorProps) {
  return (
    <span className={cn("absolute top-1 right-0 flex h-5 w-5 animate-bounce items-center justify-center", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500" />
    </span>
  );
}

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: number;
}

function AlbumArtwork({ album, aspectRatio = 3 / 4, className, ...props }: AlbumArtworkProps) {
  const isVideo = album.cover.endsWith('.mp4');

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Link as={`/dashboard/p/${album.id}`} href={`/dashboard/p/${album.id}`}>
        <ContextMenu>
          <ContextMenuTrigger>
            <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-md">
              {isVideo ? (
                <video controls className="object-cover transition-all hover:scale-105" autoPlay muted loop>
                  <source src={album.cover} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={album.cover} alt={album.name} className="object-cover transition-all hover:scale-105" />
              )}
            </AspectRatio>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-40">
            <ContextMenuItem>Add to Library</ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Playlist
                </ContextMenuItem>
                <ContextMenuSeparator />
                {playlists.map((playlist) => (
                  <ContextMenuItem key={playlist}>
                    <ListMusic className="mr-2 h-4 w-4" /> {playlist}
                  </ContextMenuItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem>Play Next</ContextMenuItem>
            <ContextMenuItem>Play Later</ContextMenuItem>
            <ContextMenuItem>Create Station</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Like</ContextMenuItem>
            <ContextMenuItem>Share</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Link>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">{album.artist}</p>
      </div>
    </div>
  );
}
const playlists = [
  "Recently Added",
  "Recently Played",
];