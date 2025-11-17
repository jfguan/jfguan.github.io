export const Key = ({ value, onValueInput, classes }) => {
  const onClick = () => {
    onValueInput(value);
  };

  return (
    <div className={classes} onClick={onClick}>
      {value}
    </div>
  );
};
