interface RecordingControlsProps {
  isRecording: boolean
  onStartRecording: () => void
  onStopRecording: () => void
  volume: number
  onVolumeChange: (volume: number) => void
  recordings: any[]
  onPlayRecording: (recording: any) => void
}

export default function RecordingControls({
  isRecording,
  onStartRecording,
  onStopRecording,
  volume,
  onVolumeChange,
  recordings,
  onPlayRecording,
}: RecordingControlsProps) {
  return (
    <div className="mb-8 max-w-4xl mx-auto">
      <div className="bg-dark-card border-2 border-dark-border rounded-2xl p-6">
        {/* Recording Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg
              transition-all duration-200
              ${
                isRecording
                  ? 'bg-electric-pink text-white shadow-neon-pink animate-pulse'
                  : 'bg-electric-blue text-dark-bg shadow-neon-blue hover:scale-105'
              }
            `}
          >
            {isRecording ? '⏹️ Stop Recording' : '⏺️ Start Recording'}
          </button>
        </div>

        {/* Volume Control */}
        <div className="mb-6">
          <label className="flex items-center gap-4">
            <span className="text-electric-cyan font-semibold min-w-[80px]">
              🔊 Volume
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-dark-border rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-4
                         [&::-webkit-slider-thumb]:h-4
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-electric-cyan
                         [&::-webkit-slider-thumb]:shadow-neon-blue"
            />
            <span className="text-electric-cyan font-mono min-w-[50px]">
              {Math.round(volume * 100)}%
            </span>
          </label>
        </div>

        {/* Recordings List */}
        {recordings.length > 0 && (
          <div>
            <h3 className="text-electric-purple font-bold mb-3">
              📼 Recordings ({recordings.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {recordings.map((recording) => (
                <div
                  key={recording.id}
                  className="flex items-center justify-between bg-dark-bg rounded-lg p-3"
                >
                  <div className="text-sm">
                    <span className="text-gray-400">
                      {new Date(recording.createdAt).toLocaleTimeString()}
                    </span>
                    <span className="text-electric-green ml-3">
                      {(recording.duration / 1000).toFixed(1)}s
                    </span>
                  </div>
                  <button
                    onClick={() => onPlayRecording(recording)}
                    className="px-4 py-2 bg-electric-green/20 text-electric-green
                             rounded-lg hover:bg-electric-green/30 transition-colors"
                  >
                    ▶️ Play
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
