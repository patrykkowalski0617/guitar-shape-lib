import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useMusicStore } from "@/store/useMusicStore";
import { MUSIC_KEYS, type MusicKeyId } from "@/utils/musicKeys/musicKeys";

export default function KeySelect() {
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const setCurrentKey = useMusicStore((state) => state.setCurrentKey);

  const options = Object.entries(MUSIC_KEYS).map(([id, data]) => ({
    id: id as MusicKeyId,
    name: data.unifiedName,
  }));

  const handleChange = (event: SelectChangeEvent<MusicKeyId>) => {
    setCurrentKey(event.target.value as MusicKeyId);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="key-select-label">Unified Keys</InputLabel>
      <Select
        labelId="key-select-label"
        id="key-select"
        value={currentKeyId}
        label="Unified Keys"
        onChange={handleChange}
      >
        {options.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
