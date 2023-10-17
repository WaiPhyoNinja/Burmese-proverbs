import PromptCard from "./PromptCard"

const PromptList = ({data , handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
       { data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
       ))}
    </div>
  )
}

export default PromptList
