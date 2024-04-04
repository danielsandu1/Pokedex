import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-between mb-4">
      <Input placeholder="Type a name" className="mr-4 w-2/3" />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="type1">type1</SelectItem>
          <SelectItem value="type2">type2</SelectItem>
          <SelectItem value="type3">type3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
