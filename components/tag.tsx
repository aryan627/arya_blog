import { useRouter } from 'next/navigation'

interface TagProps {
  name: string
}

export default function Tag({ name }: TagProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/blog?tag=${name}`)
  }

  return (
    <button onClick={handleClick} className="tag">
      {name}
    </button>
  )
}

