import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = [...allBlogs]
    .filter((p) => !p.draft)
    .sort((a, b) => {
      const stickyDelta = Number(b.sticky ?? false) - Number(a.sticky ?? false)
      if (stickyDelta) return stickyDelta
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
