import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function getYouTubeEmbedUrl(link: string): string {
  try {
    const url = new URL(link);
    if (url.hostname.includes("youtube.com") && url.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    }
    if (url.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${url.pathname}`;
    }
    return link;
  } catch {
    return link;
  }
}

export function Card({ title, link, type }: CardProps) {
  useEffect(() => {
    if (type === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  return (
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <ShareIcon size={"md"} />
          </div>
          {title}
        </div>
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ShareIcon size={"md"} />
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon size={"md"} />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={getYouTubeEmbedUrl(link)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
