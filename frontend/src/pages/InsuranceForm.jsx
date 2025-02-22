// ...existing imports...

// Add this function with your other handlers
const handleFamilyMemberAgeChange = (index, value) => {
  // Ensure value is not negative
  const newValue = Math.max(0, parseInt(value) || 0);
  handleFamilyMemberChange(index, 'age', newValue.toString());
};

// In the family members section where age TextField is rendered
<TextField
  label="Age"
  type="number"
  value={member.age}
  onChange={(e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    handleFamilyMemberChange(index, 'age', value);
  }}
  fullWidth
  required
  sx={{ 
    '& input[type=number]': { 
      '-webkit-inner-spin-button': {
        '-webkit-appearance': 'inner-spin-button',
        opacity: 1
      }
    }
  }}
  inputProps={{
    min: 0,
    pattern: '[0-9]*',
    inputMode: 'numeric',
    onKeyDown: (e) => {
      if (e.key === '-' || e.key === '+' || e.key === 'e') {
        e.preventDefault();
      }
    }
  }}
/>

// ...rest of existing code...
