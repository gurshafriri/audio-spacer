inlets = 1;
outlets = 2;

function list(...args) {
  let output = [0, 0];
  let output_indices = [1];

  if (args[0] !== -1) {
    for (let i = 0; i < args.length; i++) {
      output_indices.push(args[i]);
      const current = args[i] / 44.1;
      output.push(current);

      if (i <= args.length - 2) {
        const next = args[i + 1] / 44.1;

        output.push(next < current + 2050 ? next + 150 : next - 50);
      } else {
        output.push(current + 5000);
      }
    }

    outlet(0, output);
    outlet(1, output_indices);
  } else {
	post("No slices detected, keeping slices")
	}
}

function msg_int(slice) { 
  // for a single slice
  outlet(0, [0, 0, slice / 44.1, (slice/44.1) + 10000]);
  outlet(1, [slice, slice + (10000*44.1)]);
}