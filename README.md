<!-- repository and further documentations available on https://github.com/gurshafriri/audio-spacer-->

# Audio-Spacer

A real-time spatial audio performance instrument for Max/MSP that records, slices, and spatially disperses audio with dynamic pitch shifting and rhythmic control.

## Overview

Audio-Spacer transforms recorded audio into a spatially-distributed, rhythm-synchronized performance instrument. Record any sound, slice it automatically or manually, then play it back with configurable spatial output, pitch shifting, and tempo-locked sequencing.

### Showcase
- Listen and see suggested notation in [Inhibition/Exhibition I](https://gurshafriri.github.io/gurs-creative-field/#project/inhibition-exhibition-i)  
- See [usage video excerpt](examples/excerpt.mov) 

## Features

- **Record and slice audio** - Automatic onset detection or manual marking with visual waveform markers
- **Spatial positioning** - Position chosen slices randomly or with manual control
- **Tempo-synced triggering** - Note divisions from 1/1 to 1/12
- **Dynamic pitch shifting** - Overtone series mapping or set interval
- **Live delay playback mode** - Play input directly without recording and slicing

## Requirements

- Max/MSP 9.0 or higher
- [FluidCorpusManipulation](https://www.flucoma.org/) package
- [Spat5](https://forum.ircam.fr/projects/detail/spat/) package  
- [nw.gverb~](https://github.com/NW-Instruments/NW-Externals) external

## Installation

1. Clone this repository
2. Install required packages via Max Package Manager
3. Open `audio-spacer.maxproj` in Max/MSP
4. If not by default, enter presentation mode (⌘+E / Ctrl+E)

## Quick Start

1. **Record** - Press ↵ (Enter) or click the red record button to capture audio
2. **Slice**
   1. Click "Slice by Onset" for automatic detection of slices, or choose Immediate onset detection to trigger analysis when recording stops
   2. Use the waveform slices UI to edit, add or delete slices
3. **Set playback pace** - Set BPM (default: 60) and note division (1/4, 1/8, etc.)
4. **Play slices** - Toggle "On/Off" to start playback
5. **Adjust** - Enable pitch shifting, adjust spatial control, modify dry/wet mix
6. **Configure output** - Choose speaker configuration (binaural/4-speaker/8-speaker)
7. **Live delay playback** - Change to live delay to output a live spatial delay based on same configurations

## Documentation

- [Architecture Guide](ARCHITECTURE.md) - Technical overview and system design
- [Patcher Reference](patchers/README.md) - Detailed patcher documentation  
- [JavaScript API](code/README.md) - Custom module reference
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions

## Project Structure
```
audio-spacer/
├── audio-spacer.maxproj          # Max project file
├── patchers/                      # Max/MSP patches
│   ├── audio-spacer.maxpat       # Main controller patch
│   ├── anrec.maxpat              # Recording/slicing engine
│   ├── plays.maxpat              # Slice playback voice
│   ├── live_plays.maxpat         # Live delay voice
│   └── shift.maxpat              # Pitch shifting
├── code/                          # JavaScript modules
│   ├── create_slices.js
│   ├── get_positions.js
│   ├── hoverbutton.js
│   └── set_picker_size.js
├── data/                          # Lookup tables
│   └── map_overtones.txt
└── docs/                          # Additional documentation
```

## Usage 

### Recording and Slicing
<p align="center">
  <img width="900" alt="Recording and Slicing Interface" src="https://github.com/user-attachments/assets/b628d36c-011d-460b-babf-5e74078866b2" />
</p>

**Automatic mode:**
- Choose "Immediate onset detection" to trigger analysis during recording
- Use "Slice by Onset" button after recording and for calibration purposes
- Calibrate onset metric and threshold. Default is optimized for electric guitar input.

**Manual mode:**  
- Press spacebar during recording to mark slices
- Drag yellow markers on waveform to edit positions
- Use manual editing to fine-tune the onset detection result

### Playback Control

<p align="center">
  <img width="400" alt="Tempo Controls" src="https://github.com/user-attachments/assets/ba901392-bb58-4bcd-b486-63517ac84dde" />
</p>

**Tempo:** Set BPM (60-240) and choose note divisions. LFO will oscillate between 60 and 240 at 0.5Hz

<p align="center">
  <img width="360" alt="Sequencing Options" src="https://github.com/user-attachments/assets/2917372e-0712-4c45-a549-deb6fcaab50b" />
</p>

**Sequencing:** Select slice playback order - Random, Up, Down, or UpDown

<p align="center">
  <img width="310" alt="Silence Control" src="https://github.com/user-attachments/assets/135feeea-895d-462a-9118-379676d3f4d6" />
</p>

**Silence:** Adjust % silent to add rhythmic space from 0-100% of events

<p align="center">
  <img width="310" alt="Duration Control" src="https://github.com/user-attachments/assets/a014f9be-6280-4fa8-9516-cbf47ab3e8bb" />
</p>

**Duration:** Set maximum note length to create legato or staccato effects. The lowest of either this parameter or the slice length will be the actual duration.

<p align="center">
  <img width="300" alt="Slice Selector" src="https://github.com/user-attachments/assets/9d1bed31-b399-4e99-9fcc-226fe4688c58" />
</p>

**Mute slices:** Select specific slices to be played or muted

### Spatial Control
<p align="center">
  <img width="500" alt="Spatial Control Interface" src="https://github.com/user-attachments/assets/9358897e-2068-4055-aaaf-2eb04c921fdb" />
</p>

**Random mode:** [Default] Leave LCD blank for automatic random positioning  
**Manual mode:** Draw in LCD display to control spatial location. The square represents a Left-Right-Front-Back matrix.  
**Choose output method:** Binaural for headphones, 4 speakers or 8 speakers  
**Optional reverb:** Recommended for binaural or dry setting   

### Pitch Shifting
<p align="center">
  <img width="330" alt="Pitch Shifting Controls" src="https://github.com/user-attachments/assets/7817b29c-01a5-42b6-8ec9-3a27198727b6" />
</p>

**Enable pitch shifting:** When enabled, random events will be chosen to be shifted  
**Manual shift:** Set octave, semitones, and cents precisely  
**LFO:** Enable smooth modulation of pitch, will oscillate ±35 cents at 0.5Hz
**Random Spectra:** Map pitch shift to overtone series, will override the manual shift and choose a random harmonic between the 1st and 30th

## Troubleshooting

See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) for detailed solutions to common issues.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for technical overview and system design details.

## Contributing

Contributions welcome! Areas of interest:
- MIDI/OSC control implementation
- Performance optimizations
- UI/UX improvements
- Bug and quirk fixes 
- Anything else 

Please open an issue or pull request.

## License

MIT License - see LICENSE file for details.

## Credits

Built with:
- [Max/MSP](https://cycling74.com/products/max) by Cycling '74
- [FluidCorpusManipulation](https://www.flucoma.org/) by FluCoMa  
- [Spat5](https://forum.ircam.fr/projects/detail/spat/) by IRCAM
- [nw.gverb~](https://github.com/NW-Instruments/NW-Externals) by Nathan Wolek

## Contact

Gur Shafriri  
shafriri.gur@gmail.com  
[github.com/gurshafriri/audio-spacer](https://github.com/gurshafriri/audio-spacer)