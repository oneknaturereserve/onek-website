import type { Metadata } from "next";
import StoryPage from "./StoryPage";

export const metadata: Metadata = {
  title: "The Story of OneK | OneK Nature Reserve",
  description: "Growing Together: A Family and a Rainforest.",
};

export default function Page() {
  return <StoryPage />;
}
