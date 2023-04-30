"use client"

import Image from "next/image"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useAtom } from "jotai"

import { FeedList } from "@/lib/notion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { selectedTypeAtom } from "./state"

dayjs.extend(relativeTime)

export default function GitHubTimelineList({
  githubTimeline,
}: {
  githubTimeline: FeedList
}) {
  const [selectedType] = useAtom(selectedTypeAtom)

  return (
    <>
      {githubTimeline
        .filter((item) => selectedType.includes(item.feedInfo.type))
        .map((item) => {
          return (
            <div key={item.contentSnippet}>
              <div className="flex items-center gap-10 py-4">
                <Image
                  src={item.feedInfo.avatar}
                  alt={item.feedInfo.title}
                  width={50}
                  height={50}
                  className="my-4 self-start rounded-full ring-2 ring-ring ring-offset-2"
                ></Image>
                <div className="space-y-3">
                  <h2 className="my-4 text-lg font-semibold">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {item.title}
                    </a>
                  </h2>
                  <p
                    className="text-sm text-muted-foreground"
                    title={item.isoDate}
                  >
                    {dayjs(item.isoDate).fromNow()}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    {item.contentSnippet?.split("\n").slice(10).join("\n")}
                  </p>
                  <Badge variant={"outline"}>{item.feedInfo.type}</Badge>
                </div>
              </div>
              <Separator orientation="horizontal"></Separator>
            </div>
          )
        })}
    </>
  )
}
