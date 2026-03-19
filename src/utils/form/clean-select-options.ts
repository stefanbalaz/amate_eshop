type SelectOption = { value: string; label: string };

export const cleanInputOptions = (options: SelectOption[]): SelectOption[] => {
  const removedEmptyOptions = (options: SelectOption[]): SelectOption[] => {
    return options.filter((option) => option.value.trim() !== "");
  };

  const removedDuplicateOptions = (options: SelectOption[]): SelectOption[] => {
    return options.filter(
      (option, index, self) =>
        index === self.findIndex((t) => t.value === option.value)
    );
  };

  const execute = (): SelectOption[] => {
    const optionsWithoutEmpty = removedEmptyOptions(options);
    const optionsUnique = removedDuplicateOptions(optionsWithoutEmpty);
    return optionsUnique;
  };

  return execute();
};
