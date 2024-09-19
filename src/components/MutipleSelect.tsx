import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type MultipleSelectProps = {
  selected: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  label: string;
  id: string | number;
  options: string[];
  disabled?: boolean;
};

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  selected,
  handleChange,
  label,
  id,
  options,
  disabled,
}) => {
  return (
    <FormControl fullWidth style={{ marginTop: "1.75rem" }}>
      <InputLabel id={`select-${id}`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}`}
        multiple
        value={selected}
        onChange={(event) => {
          handleChange(event as SelectChangeEvent<string[]>);
        }}
        input={<OutlinedInput label={label} />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              width: 250,
              overflow: "auto",
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 1300,
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
        disabled={disabled}
      >
        {options &&
          options.length > 0 &&
          options.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
