import { useState } from 'react'
import Pad from './Pad'

interface PadGridProps {
  volume: number
  onPadPress: (padId: number) => void
}

const PAD_CONFIG = [
  { id: 1, name: 'Kick', color: 'electric-blue', sound: 'kick' },
  { id: 2, name: 'Snare', color: 'electric-purple', sound: 'snare' },
  { id: 3, name: 'Hi-Hat', color: 'electric-pink', sound: 'hihat' },
  { id: 4, name: 'Clap', color: 'electric-green', sound: 'clap' },
  { id: 5, name: 'Tom', color: 'electric-yellow', sound: 'tom' },
  { id: 6, name: 'Cymbal', color: 'electric-cyan', sound: 'cymbal' },
  { id: 7, name: 'Bass', color: 'electric-blue', sound: 'bass' },
  { id: 8, name: 'FX', color: 'electric-purple', sound: 'fx' },
]

export default function PadGrid({ volume, onPadPress }: PadGridProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {PAD_CONFIG.map((pad) => (
          <Pad
            key={pad.id}
            id={pad.id}
            name={pad.name}
            color={pad.color}
            sound={pad.sound}
            volume={volume}
            onPress={onPadPress}
          />
        ))}
      </div>
    </div>
  )
}
