export const handleNextFocus = (event, next) => {
  const { value, maxLength } = event.target;
  if (value.length === maxLength) {
    if (next) {
      const nextRef = document.getElementById(next);
      if (nextRef) {
        nextRef.focus();
      }
    }
  }
};
