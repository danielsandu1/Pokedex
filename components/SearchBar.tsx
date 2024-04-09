import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeSelectChange: (value: string) => void;
  options: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchInputChange,
  onTypeSelectChange,
  options,
}) => {
  return (
    <div className="sm:flex sm:justify-between mb-4">
      <Input
        placeholder="Type a name"
        className="mb-2 sm:mb-0 w-full sm:w-2/3 sm:mr-4"
        onChange={onSearchInputChange}
      />
      <Select onValueChange={onTypeSelectChange}>
        <SelectTrigger className="w-full md:w-[180px] sm:w-1/3 ">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option} key={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
