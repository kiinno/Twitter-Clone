import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/Posts/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
