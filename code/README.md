# JavaScript API Reference

Documentation for Audio-Spacer's custom JavaScript modules.

## create_slices.js

**Purpose**: Transforms marker positions from samples to millisecond slices ready for playback

**Interface**: 1 inlet, 2 outlets

**Functions**:

### `list(...args)`
Converts sample positions to ms format for slice playback.

```javascript
// Input: list of sample positions
// Output 0: [0, 0, time1_ms, time1_end_ms, time2_ms, time2_end_ms, ...]
// Output 1: [1, sample1, sample2, ...]
```

**Note**: Hardcoded for 44.1kHz sample rate (divides by 44.1).

### `msg_int(slice)`
Handles single slice position.

```javascript
// Input: sample position
// Output: Formatted slice data for playback
```

## get_positions.js

**Purpose**: Parses the markers UI dictionary and sends marker locations as a list

**Interface**: 1 inlet, 1 outlet

**Function**:

### `dictionary(dictname)`
Extracts spatial marker positions from LCD interface.

```javascript
// Input: message "dictionary <name>"
// Process: Parse JSON, filter marker layers, extract positions
// Output: Sorted array of [x, y] positions
```

**Usage**: Empty output = random spatial mode, positions present = manual mode

## set_picker_size.js

**Purpose**: Changes the picker matrixctrl layout to be proportional based on number of slices

**Interface**: 1 inlet, no outlets (operates via scripting)

**Function**:

### `set_picker_size(columns, height)`
Resizes the "picker" matrixctrl to match slice count.

```javascript
// Parameters:
// - columns: Number of slices
// - height: Height in pixels

// Sets width to columns*30 and reinitializes cells
```

**Requirement**: matrixctrl must have scripting name "picker"

## hoverbutton.js

**Purpose**: Custom button with hover effect for better UI feedback

Created to provide visual hover states not available in standard Max buttons. Outputs bang on click with 50ms visual feedback delay.

**Interface**: 1 inlet, 1 outlet (bang)

## Waveform modification 
Some modifcations in the markers waveform JS UI were made to allow more manual control of the markers. 

## See Also

- [Architecture Guide](../docs/ARCHITECTURE.md)
- [Patcher Reference](../patchers/README.md)
- [Troubleshooting](../docs/TROUBLESHOOTING.md)
