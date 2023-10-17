import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
    မြန်မာစာ သည် ဒို့စာ
      <br className='max-md:hidden' />
      <span className='yellow_gradient text-center'>မြန်မာ စကားသည် ဒို့ စကား</span>
    </h1>
    <br />
    <p className='desc text-center'>
      EasyAIPrompt is an AI prompting tool for modern world to
      discover, collaborate and share creative prompts
    </p>
    <Feed />
  </section>
  )
}

export default Home