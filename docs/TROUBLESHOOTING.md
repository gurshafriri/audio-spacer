# Troubleshooting Guide

Common issues and solutions for Audio-Spacer.

## Installation Issues

### Packages not loading
**Symptoms**: "Object not found" errors, red dashed boxes

**Solutions**:
- Open Max Package Manager: `File → Show Package Manager`
- Install: FluidCorpusManipulation, Spat5
- Download nw.gverb~ from [NW-Externals GitHub](https://github.com/NW-Instruments/NW-Externals)
- Restart Max completely
- If persists: `Options → File Preferences → Clear File Cache`


## Performance Issues

### High CPU usage
**Solutions**:
- Disable reverb when not needed
- Disable pitch shifting when not needed
- Reduce active slices in picker
- Increase I/O Vector Size (1024)
- Use binaural instead of 8-speaker
- Close other Max patches and applications

### UI lagging
**Solutions**:
- Close Max console (⌘+M / Ctrl+M)
- Disable automatic onset detection (use button manually)
- Close other Max patches

## Audio Issues

### No audio output
**Check**:
1. Max audio enabled (speaker icon in bottom-right, or `Options → Audio Status`)
2. Correct audio interface selected in Driver Setup
3. DAC is on in patch
4. Speaker config matches outputs (binaural=2, 4-speaker=4, 8-speaker=8)
5. Dry/wet mix not at 0%

### Crackling/distortion
**Solutions**:
- Increase I/O Vector Size: `Options → Audio Status → I/O Vector Size` (try 512 or 1024)
- Reduce CPU load: Disable reverb/pitch shift when not needed
- Check input levels aren't clipping
- Use dedicated audio interface with ASIO/Core Audio drivers

### High latency
**Solutions**:
- Reduce I/O Vector Size (128 or 256)
- Use dedicated audio interface
- Close other audio applications

## Recording/Slicing Issues

### No slices detected or too many
**Solutions**:
- Set lower/higher threshold
- Try different metrics
- Ensure waveform shows recorded audio
- Verify FluCoMa package installed

### Can't edit markers
**Solutions**:
- Enable presentation mode: ⌘+E / Ctrl+E
- Click directly on yellow marker lines 
- Redetect with automatic onset to create at least one marker 

## Pitch Shifting Issues

### Artifacts/unnatural sound
**This is normal for large pitch shifts**
- Use smaller shifts (<200 cents) for cleaner sound
- Octaves (1200 cents) shift better than intermediate values
- Sustained tones shift better than percussive sounds
- Disable LFO if problematic


## General Tips

**Before live performance**:
- Test full signal chain
- Set appropriate buffer sizes
- callibrate onset detection
- Monitor CPU during rehearsal
- Have manual slicing backup plan
- Save project before changes


**Always**:
- Use presentation mode (⌘+E / Ctrl+E)
- Save frequently
- Monitor CPU usage (⌘+B / Ctrl+B)
- Check audio levels throughout chain

## See Also

- [Architecture Guide](../ARCHITECTURE.md)
- [Patcher Reference](../patchers/README.md)
- [JavaScript API](../code/README.md)
