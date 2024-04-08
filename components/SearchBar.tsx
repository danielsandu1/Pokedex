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
    <div className="flex justify-between mb-4">
      <Input
        placeholder="Type a name"
        className="mr-4 w-2/3"
        onChange={onSearchInputChange}
      />
      <Select onValueChange={onTypeSelectChange}>
        <SelectTrigger className="w-[180px]">
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
