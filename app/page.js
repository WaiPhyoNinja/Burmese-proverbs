import Feed from "@components/Feed"

const Home = () => {
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
    <Feed />
  </section>
  )
}

export default Home