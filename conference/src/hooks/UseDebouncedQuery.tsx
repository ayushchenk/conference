import { TextField } from "@mui/material";
import { useCallback, useRef, useState } from "react";

export const useDebounceQuery = (placeholder = "Enter search query", delay = 350) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(e.target.value);
      debounceTimeout.current = null;
    }, delay);

  }, [delay]);

  const debouncedInput = <TextField
    fullWidth
    sx={{ mt: 1 }}
    margin="normal"
    id="query"
    name="query"
    label="Search query"
    placeholder={placeholder}
    type="text"
    onChange={handleChange}
  />
  return { debouncedQuery, debouncedInput };
}