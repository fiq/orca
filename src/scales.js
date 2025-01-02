const scales = {
	"ionian":    ['W', 'W', 'H', 'W', 'W', 'W', 'H'],
	"dorian":    ['W', 'H', 'W', 'W', 'W', 'H', 'W'],
	"phyrigian": ['H', 'W', 'W', 'W', 'H', 'W', 'W'],
	"lydian":    ['W', 'W', 'W', 'H', 'W', 'W', 'H'],
	"mixolydian":['W', 'W', 'H', 'W', 'W', 'H', 'W'],
	"aeolian":   ['W', 'H', 'W', 'W', 'H', 'W', 'W'],
	"locrian":   ['H', 'W', 'W', 'H', 'W', 'W', 'W']
};

const OCTAVE = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];

export const get_scale = (root, type) => {
  // get octave and details
  const note_details = get_note_and_octave(root);

  const [startIndex] = OCTAVE.map( (note, idx) => { if (note === note_details.note) return idx; } ).filter( x=>x );
  const result = [root];
  const scale_formula = [...scales[type]];
  return build_scale(result, startIndex, scale_formula);
};

const get_note_and_octave = (full_note) => {
  const matches = full_note.match(/(?<note>\D+?)(?<isflat>b?)(?<octave>\d+)/).groups;
  return {
	  note: matches.note,
	  is_flat: matches.isflat,
	  octave:  parseInt(matches.octave)
  };
};

const build_scale = (result, idx, scale_formula) => {
  // get octave and details
  const note_details = get_note_and_octave(result[result.length-1]);
  // use scale to determine if flat
  const step = scale_formula.shift();
  let idx_next = idx;
  switch (step) {
    case "H": idx_next = (idx+1) % OCTAVE.length ; break;
    default: idx_next = (idx+2) % OCTAVE.length;  break;
  }

  const octave = (idx_next < idx) ? note_details.octave+1 : note_details.octave;
  const next_note = OCTAVE[idx_next];
  result.push(`${next_note}${octave}`);
  
  // recurse
  if (scale_formula.length === 0) {
	  return result;
  } 
  return build_scale(result, idx_next, scale_formula);
}
