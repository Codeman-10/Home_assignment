import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type BasicSelectProps = {
  selected: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  label: string;
  id: string | number;
  options: string[];
};

const BasicSelect: React.FC<BasicSelectProps> = ({
  selected,
  handleChange,
  label,
  id,
  options,
}) => {
  return (
    <FormControl fullWidth style={{ marginTop: "1.75rem" }}>
      <InputLabel id={`select-${id}`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}`}
        value={selected}
        label={label}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              width: 250,
              overflow: "auto",
              position: "absolute",
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
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
