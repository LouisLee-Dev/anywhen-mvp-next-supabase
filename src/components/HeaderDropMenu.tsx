import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function HeaderDropDownMenu() {
    return (
            <div className="flex items-center border border-solid border-gray-400 rounded-full hover:border-gray-600 py-1 px-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <div className="flex items-center">
                            <div className="px-1">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="block fill-none h-4 w-4 stroke-current overflow-visible"
                                >
                                <g fill="none">
                                    <path d="M2 16h28M2 24h28M2 8h28"></path>
                                </g>
                            </svg>
                            </div>
                            <div className="relative w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-11 h-11 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                        </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Sign Up</DropdownMenuItem>
                            <DropdownMenuItem>Log In</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Gift Cards</DropdownMenuItem>
                            <DropdownMenuItem>Help Center</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
    )
}