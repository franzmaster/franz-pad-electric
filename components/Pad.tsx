import { useState, useRef, useEffect } from 'react'

interface PadProps {
  id: number
  name: string
  color: string
  sound: string
  volume: number
  onPress: (id: number) => void
}

export default function Pad({ id, name, color, sound, volume, onPress }: PadProps) {
  const [isPressed, setIsPressed] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const playSound = () => {
    if (!audioContextRef.current) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Different frequencies for different sounds
    const frequencies: { [key: string]: number } = {
      kick: 60,
      snare: 200,
      hihat: 800,
      clap: 400,
      tom: 120,
      cymbal: 1200,
      bass: 80,
      fx: 440,
    }

    oscillator.frequency.value = frequencies[sound] || 440
    oscillator.type = sound === 'hihat' || sound === 'cymbal' ? 'square' : 'sine'

    gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  }

  const handlePress = () => {
    setIsPressed(true)
    playSound()
    onPress(id)

    setTimeout(() => setIsPressed(false), 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePress()
    }
  }

  const shadowClass = `shadow-neon-${color.split('-')[1]}`

  return (
    <button
      onClick={handlePress}
      onKeyDown={handleKeyDown}
      className={`
        relative aspect-square rounded-2xl
        bg-gradient-to-br from-dark-card to-dark-bg
        border-2 border-${color}
        flex flex-col items-center justify-center
        transition-all duration-150
        hover:scale-105 hover:${shadowClass}
        focus:outline-none focus:ring-2 focus:ring-${color}
        ${isPressed ? 'scale-95 ' + shadowClass : ''}
      `}
      aria-label={`Play ${name} sound`}
    >
      <div className={`text-4xl md:text-5xl mb-2 ${isPressed ? 'animate-pulse-neon' : ''}`}>
        {['🥁', '🎵', '🎶', '👏', '🔊', '💥', '🎸', '✨'][id - 1]}
      </div>
      <span className={`text-lg md:text-xl font-bold text-${color}`}>
        {name}
      </span>
      <span className="text-xs text-gray-500 mt-1">PAD {id}</span>
    </button>
  )
}
