import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";


interface SearchWeatherProps {
    onAddCity: (newCity: string) => void
}

const SearchWeather = ({ onAddCity }: SearchWeatherProps) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddCity(inputValue);
        setInputValue("");
    };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Search for a city"
          value={inputValue}
          onChange={onInputChange}
        />
      </form>
    </>
  );
};
export default SearchWeather;
