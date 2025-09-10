import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// PUBLIC_INTERFACE
export default function CategoryFilter({ categories = [], value, onChange }) {
  /** Dropdown for selecting a category filter */
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        label="Category"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value || null)}
        displayEmpty
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((c) => (
          <MenuItem key={c.id || c.slug || c.name} value={c.id || c.slug}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
