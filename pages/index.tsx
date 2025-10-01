import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import PadGrid from '@/components/PadGrid'
import RecordingControls from '@/components/RecordingControls'

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState<any[]>([])
  const [volume, setVolume] = useState(0.7)
  const recordingStartTime = useRef<number>(0)
  const currentRecording = useRef<any[]>([])

  const handleStartRecording = () => {
    setIsRecording(true)
    recordingStartTime.current = Date.now()
    currentRecording.current = []
  }

  const handleStopRecording = () => {
    if (isRecording && currentRecording.current.length > 0) {
      const newRecording = {
        id: Date.now(),
        events: currentRecording.current,
        duration: Date.now() - recordingStartTime.current,
        createdAt: new Date().toISOString(),
      }
      setRecordings(prev => [...prev, newRecording])
    }
    setIsRecording(false)
    currentRecording.current = []
  }

  const handlePadPress = (padId: number) => {
    if (isRecording) {
      currentRecording.current.push({
        padId,
        timestamp: Date.now() - recordingStartTime.current,
      })
    }
  }

  const handlePlayRecording = (recording: any) => {
    // Implementar playback das gravações
    console.log('Playing recording:', recording)
  }

  return (
    <>
      <Head>
        <title>Franz Pad - Electric DJ Pad</title>
        <meta name="description" content="DJ Pad com 8 efeitos de som e sistema de gravação" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-dark-bg bg-neon-glow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 animate-glow">
              FRANZ PAD
            </h1>
            <p className="text-electric-cyan text-xl">
              🎛️ Electric DJ Pad Experience
            </p>
          </div>

          {/* Recording Controls */}
          <RecordingControls
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            volume={volume}
            onVolumeChange={setVolume}
            recordings={recordings}
            onPlayRecording={handlePlayRecording}
          />

          {/* Pad Grid */}
          <PadGrid
            volume={volume}
            onPadPress={handlePadPress}
          />

          {/* Footer */}
          <div className="text-center mt-12 text-electric-blue/60">
            <p>Made with ⚡ by Franz</p>
          </div>
        </div>
      </main>
    </>
  )
}
