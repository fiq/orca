const scales = {
	"ionian":    ['W', 'W', 'H', 'W', 'W', 'W', 'H'],
	"dorian":    ['W', 'H', 'W', 'W', 'W', 'H', 'W'],
	"phyrigian": ['H', 'W', 'W', 'W', 'H', 'W', 'W'],
	"lydian":    ['H', 'W', 'W', 'W', 'H', 'W', 'W'],
	"mixolydian":['W', 'W', 'H', 'W', 'W', 'H', 'W'],
	"aeolian":   ['W', 'H', 'W', 'W', 'H', 'W', 'W'],
	"locrian":   ['H', 'W', 'W', 'H', 'W', 'W', 'W']
};

const MINOR_SYMBOL = 'b';

const offset_from_a = (note) => {
  const note_char = note.charCodeAt(0);
  return note_char - 65;
};

export const get_scale = (root, type) => {
  const result = [root];
  const scale_formula = [...scales[type]];
  return build_scale(result, scale_formula);
};

const get_note_and_octave = (full_note) => {
  const matches = full_note.match(/(?<note>\D+?)(?<isminor>b?)(?<octave>\d+)/).groups;
  return {
	  note: matches.note,
	  is_minor: matches.isminor,
	  octave:  parseInt(matches.octave),
	  offset_from_a: offset_from_a(matches.note)
  };
};

const get_next_note = (last_note, step) => {
  const offset_from_a = (last_note.offset_from_a + 1) % 7;
  const octave = offset_from_a < last_note.offset_from_a ? last_note.octave + 1 : last_note.octave;
  const note = String.fromCharCode(offset_from_a + 65);
  const isminor = step === 'H' ? 'b' : '';

  return `${note}${isminor}${octave}`;
}

const build_scale = (result, scale_formula) => {
  // decompose note
  const last_note = get_note_and_octave(result[result.length-1]);

  // use scale to determine if flat
  const step = scale_formula.shift();
  result.push(get_next_note(last_note, step));
   
  // recurse
  if (scale_formula.length === 0) {
	  return result;
  } 
  return build_scale(result, scale_formula);
}
