"use client";
import Feed from "@components/Feed"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSpring, animated } from "react-spring";

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const { data: session } = useSession();
  const celebrationSpring = useSpring({
    transform: showCelebration ? "scale(1)" : "scale(0)",
  });
   
  const handleLikeClick = async post => {
    try {
      const likeEndpoint = `/api/like/new`;
      const response = await fetch(likeEndpoint, {
        method: "POST",
        body: JSON.stringify({ user: session?.user.id, prompt: post._id }),
      });
      if (response.ok) {
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          // router.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Poet's Oasis:
        <br className='max-md:hidden' />
        <span className='yellow_gradient text-center'>Explore Your Dream Poem Here</span>
      </h1>
      <br />
      <p className='desc text-center'>
        Share your poems or beloved verses with our community. Join us in celebrating the beauty of words and emotionss
      </p>

      <Feed handleLikeClick={handleLikeClick}  />
      {showCelebration && (
        <animated.div
          style={{
            ...celebrationSpring,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "2rem",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        >
          🎉 🎉 🎉
        </animated.div>
      )}
    </section>
  )
}

export default Home