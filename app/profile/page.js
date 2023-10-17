"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";



const SelfProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if (!response.ok) {
        console.log(`Failed to fetch data: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setMyPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async post => {
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
      const filteredPosts = myPosts.filter((item) => item._id !== post._id);
      setMyPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts here'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default SelfProfile
