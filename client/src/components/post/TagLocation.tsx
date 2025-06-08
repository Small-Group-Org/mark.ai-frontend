import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MapPin, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { searchLocation } from '@/services/postServices';
import { useToast } from '@/hooks/use-toast';
import { Location } from '@/types';

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface LocationDropdownProps {
    selectedLocation: string;
    setSelectedLocation: (location: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLocationOpen: boolean;
    setIsLocationOpen: (isOpen: boolean) => void;
    width?: string;
  }
  
  const LocationDropdown: React.FC<LocationDropdownProps> = ({
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    isLocationOpen,
    setIsLocationOpen,
  }) => {
    const [locationResults, setLocationResults] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const { toast } = useToast();
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isLocationOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isLocationOpen]);

    useEffect(() => {
      const fetchLocations = async () => {
        if (!debouncedSearchQuery) return;
        
        setIsLoading(true);
        try {
          const response = await searchLocation(debouncedSearchQuery) as Location[];
          
          if (response) {
            const correctSearchResults = response.filter(result => result?.location)
            setLocationResults(correctSearchResults.slice(0, 10));
          }
        } catch (error) {
          console.error('Error fetching locations:', error);
          toast({
            title: "Error",
            description: "Failed to fetch locations",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchLocations();
    }, [debouncedSearchQuery]);

    const filteredLocations = locationResults.map(location => {
      const city = location.location.city || "";
      const country = location.location.country || "";
      const parts = [location.name];
      
      if (city) parts.push(city);
      if (country) parts.push(country);
      
      return {
        id: location.id,
        name: parts.join(", ")
      };
    });

    return (
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <h3 className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
          Tag Location:
        </h3>
        <DropdownMenu open={isLocationOpen} onOpenChange={setIsLocationOpen}>
          <DropdownMenuTrigger className="flex items-center flex-1 gap-2 px-3 py-1.5 text-xs md:text-sm border rounded-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none">
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="flex-1 text-left truncate">
              {selectedLocation || 'Add Location'}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className={`w-[90vw] sm:w-[300px] p-2 z-[100]`}
            align="start"
          >
            <div className="relative mb-2">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
                autoComplete="off"
              />
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center flex-col justify-center py-4">
                  <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                 <p className="text-sm text-gray-500"> Searching...</p>
                </div>
              ) : filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <DropdownMenuItem
                    key={location.id}
                    onClick={() => {
                      setSelectedLocation(location.name);
                      setSearchQuery('');
                      setIsLocationOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{location.name}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-gray-500">
                  No locations found
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  export default LocationDropdown;