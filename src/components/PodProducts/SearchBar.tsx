'use client'

import { Loader, Loader2, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { searchPodProducts, searchProducts } from "@/actions/actions";
import PulseLoader from "react-spinners/PulseLoader";

const SearchBar = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<string[]>([]);

  const handleSearch = () => {
    setIsPending(true);
    router.push(`/PodProducts/searchQuery/${searchQuery}`);
    setTimeout(() => {
      setIsPending(false);
    }, 5000); // 5-second delay
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    const value = event.target.value;
    setSearchQuery(value);
    if (value === '') {
      setData([]);
      setIsSearching(false);
      return;
    }
    try {
      const searchData = await searchPodProducts(value);
      setData(searchData.slice(0, 8));
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleOptionSelect = (option: string) => {
    setIsPending(true);
    setData([]);
    setSearchQuery("");
    router.push(`/PodProducts/searchQuery/${option}`);
    setTimeout(() => {
      setIsPending(false);
    }, 5000); // 5-second delay
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(searchQuery===""){
        return
      }
      setData([]);
      setSearchQuery("");
      handleSearch();
    }
  };

  return (
    <nav className='sticky z-[50] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>

        <>
          <AlertDialog open={isPending}>
            <AlertDialogTrigger asChild />
            <AlertDialogContent className="flex flex-col items-center">
              <AlertDialogHeader className="flex flex-col items-center">
                <AlertDialogTitle className="text-2xl text-blue-700 font-bold text-center">
                  Searching for products!
                </AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col items-center">
                  This will take a moment.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Loader2 className="text-blue-700 h-[15%] w-[15%] animate-spin mt-3" />
            </AlertDialogContent>
          </AlertDialog>

          <div className='flex gap-4 items-center justify-center mt-2'>
            <Input
              type="search"
              className="w-[500px] border-2 border-blue-500 bg-gray-100"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <Button disabled={searchQuery === ""} onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
              Search
              <Search size={20} className='ml-1' />
            </Button>
          </div>

          {isSearching && searchQuery !== '' && data.length === 0 && (
            <div className="flex items-center justify-center">
            <ul className="bg-white border w-[60%] h-[10%] border-gray-300 mt-2 rounded-md shadow-lg">              <li
                className="px-4 py-2 justify-center items-center flex text-blue-500">
                <Loader className="animate-spin"/>
              </li>
            </ul>
            </div>
          )}

          {searchQuery !== '' && data.length > 0 && (
            <div className="flex items-center justify-center">
            <ul className="bg-white border w-[60%] border-gray-300 mt-2 rounded-md shadow-lg">
              {data.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            </div>

          )}
        </>

      </MaxWidthWrapper>
    </nav>
  );
};

export default SearchBar;
