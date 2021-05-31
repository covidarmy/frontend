import * as React from 'react'
import { useRouter } from 'next/router'
import LoadingPage from '~/components/LoadingPage'
import { auth } from '~/lib/firebase'

export default function SuccessPage() {
  const router = useRouter()

  React.useEffect(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn') as string
      if (!email) {
        const promptInput = window.prompt(
          'Please provide your email for confirmation'
        )
        if (typeof promptInput === 'string') {
          email = promptInput
        } else {
          router.push('/login')
        }
      }
      auth
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          if (result) {
            window.localStorage.removeItem('emailForSignIn')
            router.push('/dashboard')
          }
        })
        .catch((error) => {
          console.log(error)
          router.push('/login')
        })
    }
  }, [router.pathname])

  return <LoadingPage />
}
