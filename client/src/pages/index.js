import Head from 'next/head';
import Landing from '../components/Landing'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Moodify</title>
        <meta name="description" content="Express your mood through songs. Moodify is the way to show your emotions to friends" />
        <meta name="keywords" content="Moodify, Spotify Mood, Mood Songs, Spotify, Spotify Moodify" />
        <meta property="og:title" content="Moodify" />
        <meta property="og:description" content="Express your mood through songs. Moodify is the way to show your emotions to friends" />
        {/* Add Link Here */}
        <link rel="canonical" href="" key="canonical" />
      </Head>
      <Landing />
    </div>
  )
}