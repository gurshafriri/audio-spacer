# Patcher Reference

Technical documentation for Audio-Spacer's Max/MSP patchers.

## audio-spacer.maxpat (Main Controller)

**Purpose**: Central hub for UI and parameter routing

**Key Features**:
- Presentation mode interface with all controls
- Recording/playback state management
- Tempo/sequencer system (BPM 60-240, note divisions 1/1 to 1/12)
- Parameter distribution via send/receive

**Main Send Messages**:
- `s bpm`, `s note_div` - Tempo settings
- `s slice_list` - Active slice indices
- `s spatial_pos` - Coordinates for positioning
- `s pitch_*` - Pitch shift parameters (enable, octave, semitones, cents, lfo, random)
- `s speaker_config` - Output configuration
- `s reverb_*` - Reverb settings

**Main Receive Messages**:
- `r slice_count` - Number of detected slices
- `r slice_positions` - Array of slice sample positions
- `r waveform_data` - Display data

## anrec.maxpat (Recording/Slicing)

**Purpose**: Audio recording and onset detection

**Process**:
1. Records audio to named buffer via `record~`
2. On stop: Runs FluCoMa onset detection
3. Outputs to `create_slices.js` for waveform formatting
4. Manual slicing: Spacebar adds current position

**FluCoMa Parameters**:
- **metric**: "mkl" (default), "is", "foote"
- **threshold**: 0.0-1.0 (default: 0.5)
- **minslicelength**: Minimum samples between slices (default: 4410 = 100ms @ 44.1kHz)

**Outputs**: Slice positions (samples), slice count, waveform coordinates

## plays.maxpat (Slice Playback)

**Purpose**: Polyphonic slice playback with envelope shaping

**Implementation**: Runs as `poly~` voices for multiple simultaneous slices

**Signal Flow**:
1. Receive slice index from sequencer
2. Look up slice start/end in buffer
3. Play via `groove~` with envelope
4. Output to pitch processing

**Envelope**: 10ms attack, sustain, 10ms release  
**Duration**: min(slice_length, max_note_length)

## live_plays.maxpat (Live Delay)

**Purpose**: Polyphonic real-time delay without buffer recording

**Implementation**: 
- Runs as `poly~` voices for spatial delay
- `tapin~/tapout~` for variable delay
- Delay time: `(60000 / bpm) * note_division`
- Maintains spatial and pitch capabilities
- Lower latency than slice mode

## shift.maxpat (Pitch Shifting)

**Purpose**: Pitch manipulation via `gizmo~`

**Modes**:
1. **Manual**: Octave (-2 to +2) + Semitones (-12 to +12) + Cents (±100)
2. **Random Spectra**: Reads `data/map_overtones.txt`, selects harmonic 1-30
3. **LFO**: Adds ±35 cents @ 0.5Hz modulation

**Priority**: Random Spectra (if enabled) → Manual shift → + LFO

**Note**: Large shifts (>1200 cents) may cause artifacts

## Message Routing

All patchers communicate via Max's `send`/`receive` system. Key naming convention:
- `bpm`, `note_div` - Tempo
- `slice_*` - Slice data
- `spatial_*` - Spatial parameters
- `pitch_*` - Pitch parameters
- `reverb_*` - Reverb settings

## Integration Flow

**Startup**: loadbang → Initialize defaults → Load buffers → Configure Spat5

**Recording to Playback**:
1. record_start → anrec records
2. record_stop → onset detection
3. create_slices.js formats data
4. set_picker_size.js updates UI
5. Enable playback → Sequencer triggers plays
6. Audio flows: plays → shift → spatial → output

## See Also

- [Architecture Guide](../docs/ARCHITECTURE.md)
- [JavaScript API](../code/README.md)
- [Troubleshooting](../docs/TROUBLESHOOTING.md)
