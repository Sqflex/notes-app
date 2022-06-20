import { MdSearch } from 'react-icons/md';
// import SelectSearch from 'react-select-search';

const Search = ({handleSearchNote, tags}) => {
    return ( <div className="search-container">
        <MdSearch className="search-icons" size = '1.3em' />
         <input 
            onChange={(event) => tags.forEach(tag => {
                if (event.target.value === tag.name) {
                    handleSearchNote(event.target.value);
                    }
                else if (event.target.value === '') {
                    handleSearchNote(event.target.value);
                }
                })
            } 
            type='text' 
            placeholder='type tags here (Example: #Flux)' 
        />
    </div>
    )
}

export default Search;