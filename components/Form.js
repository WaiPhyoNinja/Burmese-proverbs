import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h4 className='head_text text-left'>
        <span className='blue_gradient'></span>
      </h4>
      <p className='desc text-left max-w-md'>
        သင့် ကြားဖူး သိဖူး ခဲ့သော စကားပုံများကို ဤနေရာ တွင် ရေးသား၍ ပြန်လည် မျှဝေပါ
      </p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>စာ ရေးသားရန်</span>
          <textarea value={post.prompt} onChange={e => setPost({ ...post, prompt: e.target.value })} placeholder='Write your post here' required className='form_textarea' />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            <span className='font-normal'>
             Tag (#ကဗျာ, #စကားပုံ)
            </span>
          </span>
          <input value={post.tag} onChange={e => setPost({ ...post, tag: e.target.value })} type='text' placeholder='#Tag' required className='form_input' />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>Cancel</Link>
          <button type='submit' disabled={submitting}
            className='px-5 py-1.5 text-sm bg-blue-500 rounded-full text-white'>
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
