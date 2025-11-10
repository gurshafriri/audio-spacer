# Audio-Spacer

A real-time spatial audio performance instrument for Max/MSP that records, slices, and spatially disperses audio with dynamic pitch shifting and rhythmic control.

## Overview

Audio-Spacer transforms recorded audio into a spatially-distributed, rhythm-synchronized performance instrument. Record any sound, slice it automatically or manually, then play it back with binaural spatialization, pitch shifting, and tempo-locked sequencing.

## Features

- **Record and slice audio** with Automatic onset detection or with manually with visual waveform markers
- **Spatial positioning** of chosen slices, randomlly or manually controlled
- **Tempo-synced triggering** with note divisions (1/1 to 1/12)
- **Dynamic pitch shifting** with overtone series mapping or set interval
- **Live delay playback mode** plays the input directly without recording and slicing

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

1. **Record** - Press ↵ (Enter) or click the red record button to capture capture audio
2. **Slice**
   1. Click "Slice by Onset" for automatic detection of slices, or choose Immidiate onset detection to trigger analysis when recording stops
   2. Use the waveform slices UI to edit, add or delete slices    
4. **Set playback pace** - Set BPM (default: 60) and note division (1/4, 1/8, etc.)
5. **Play slices** - Toggle "On/Off" to start playback
6. **Adjust** - Enable pitch shifting, adjust spatial control, modify dry/wet mix
7. **Live delay playback** - change to live delay to output a live spatial delay based on same configurations

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
<img width="1306" height="606" alt="image" src="https://github.com/user-attachments/assets/b628d36c-011d-460b-babf-5e74078866b2" />

**Automatic mode:**
- Choose "Immidiate onset detection" to trigger analysis during recording
- Use "Slice by Onset" button after recording and for callibration purposes
- Callibrate onset metric and threshold. Default is optimized for an electric guitar input. 

**Manual mode:**  
- Press spacebar during recording to mark slices
- Drag yellow markers on waveform to edit positions
- Use manual editing to fine tune the onset detection result

### Playback Control

**Tempo:** Set BPM (60-240) and choose note divisions. LFO will occilate between 60 and 240 in 0.5Hz 

<img width="416" height="485" alt="Screenshot 2025-11-10 at 16 49 14" src="https://github.com/user-attachments/assets/ba901392-bb58-4bcd-b486-63517ac84dde" />

**Sequencing:** Select slices playback order - Random, Up, Down, or UpDown  

<img width="375" height="189" alt="Screenshot 2025-11-10 at 16 48 40" src="https://github.com/user-attachments/assets/2917372e-0712-4c45-a549-deb6fcaab50b" />

**Silence:** Adjust % silent to add rhythmic space between 0-100% of events

<img width="318" height="102" alt="Screenshot 2025-11-10 at 16 51 28" src="https://github.com/user-attachments/assets/135feeea-895d-462a-9118-379676d3f4d6" />

**Duration:** Set maximum note length to create legato or staccato effects. The lowest of either this parameter or the slice lenght will be the actual duration. 

<img width="312" height="99" alt="Screenshot 2025-11-10 at 16 51 42" src="https://github.com/user-attachments/assets/a014f9be-6280-4fa8-9516-cbf47ab3e8bb" />

**Mute slices** Select specific slices to be played or muted

<img width="308" height="97" alt="Screenshot 2025-11-10 at 16 53 11" src="https://github.com/user-attachments/assets/9d1bed31-b399-4e99-9fcc-226fe4688c58" />

### Spatial Control
<img width="506" height="284" alt="image" src="https://github.com/user-attachments/assets/9358897e-2068-4055-aaaf-2eb04c921fdb" />

**Random mode:** [Default] Leave LCD blank for automatic random positioning  
**Manual mode:** Draw in LCD display to control spatial location. The square represent a Left-Right-Front-Back matrix. 
**Choose output method:** Binaural for headphones, 4 speakers or 8 speakers [TODO: Add functionality] 

### Pitch Shifting
<img width="336" height="370" alt="image" src="https://github.com/user-attachments/assets/7817b29c-01a5-42b6-8ec9-3a27198727b6" />

**Enable pitch shifting**: when enabled, random events will chosen to be shifted
**Manual shift:** Set octave, semitones, and cents precisely. 
**LFO:** Enable smooth modulation of pitch, will occilate ±35 cents in 0.5Hz
**Random Spectra:** Map pitch shift to overtone series, will overide the manual shift and choose a random harmonic betwen the 1st and 30th.

## Troubleshooting
See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

## Technical Details
See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed technical documentation.

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
