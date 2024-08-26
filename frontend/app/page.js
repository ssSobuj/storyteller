"use client";
import { useFetcher } from "@/components/lib/useFetcher";
import Link from "next/link";
export default function HomePage() {
  const { data } = useFetcher("/api/stories");
  return (
    <>
      <div className="stories">
        <div className="stories__wrapper">
          <div className="stories__hero">
            <div className="hero-text">
              <h1>Discover Stories Where Your Choices Matter</h1>
              <p>
                Unleash your imagination and explore a world of interactive
                narratives. Every choice leads to a new adventure.
              </p>
            </div>
            <div className="hero-button">
              <Link href="/create-story" className="button">
                Create Your Story
              </Link>
            </div>
          </div>
          <div className="stories__cards">
            <div className="header">
              <h2>All Stories</h2>
              <p>
                Explore our most popular stories, each with unique paths and
                endings.
              </p>
            </div>
            <div className="row">
              {data?.map((item, i) => (
                <div key={i} className="col-lg-6">
                  <div className="stories__inner">
                    <p>
                      <strong>Aurthur:</strong> {item?.author}
                    </p>
                    <p>
                      <strong>Publish:</strong> 24-05-2025
                    </p>
                    <h5>{item?.title}</h5>
                    <p>{item?.content}</p>
                    <Link
                      href={`/story/${item?._id}`}
                      className="btn btn-primary"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <StoryList stories={data} />; */}
    </>
  );
}
