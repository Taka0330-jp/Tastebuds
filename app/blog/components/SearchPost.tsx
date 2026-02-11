import { Input } from '@/components/ui/shadcn/input'
import React, { useState } from 'react'


type Props = {
    setFilteredSearch: (filter: string | null) => void
}
function SearchPost({ setFilteredSearch }: Props) {
    const [inputValue, setInputValue] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFilteredSearch(inputValue.trim() || null)
    }





    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="search" className="sr-only">Search</label>
            <Input
                id='search'
                type='search'
                placeholder='e.g Cafe'
                className='bg-gray-300 mb-4'
                onChange={(e) => setInputValue(e.target.value)} />
        </form>
    )
}

export default SearchPost
