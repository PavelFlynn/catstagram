import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

export function Featured({ item }) {

    const [beedSearch, setBeedSearch] = useState([]);

    useEffect(() => {
        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${item.id}`)
            .then(response => response.json())
            .then(data => {
                setBeedSearch(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [item]);

    return (
        <div>
            <img src={beedSearch[0]?.url} alt={item.name} className='w-[55px] md:w-[80px] h-[55px] md:h-[80px] m-2 rounded-full object-cover bg-slate-100' />
            <p className='text-xs text-slate-700'>{item.name}</p>
        </div>
    )
}

Featured.propTypes = {
    item: PropTypes.object,
}
