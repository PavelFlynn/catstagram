import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

export function CatCard({ item }) {

    const [catInfo, setCatInfo] = useState();

    useEffect(() => {
        fetch(`https://api.thecatapi.com/v1/images/${item.id}`)
            .then(response => response.json())
            .then(data => {
                setCatInfo(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [item.id]);

    /* Fix data hasn't loaded yet */
    if (!catInfo) return 'Loading...';

    return (
        <div className='p-2 rounded-lg bg-white'>
            <div className='relative flex justify-start items-center box-border'>
                <div>
                    <img src={catInfo.url} alt='' className='w-[70px] h-[70px] rounded-full object-cover' />
                </div>
                <div className='mx-3'>
                    <p className='text-slate-500'>Breed ID: <span className='text-base text-black font-semibold'>{catInfo.id}</span></p>
                </div>
            </div>
        </div>
    )
}

CatCard.propTypes = {
    item: PropTypes.object,
}
