import { currentUser } from '@clerk/nextjs'

const Loading = async () => {
  const user = await currentUser()
  return (
    <div>
      <h1>Hi {user?.firstName}, the page is Loading ...</h1>
    </div>
  )
}

export default Loading
