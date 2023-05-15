import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { DialogModal } from './DialogModal';

export function SearchFeed() {
    
    const [beedSearch, setBeedSearch] = useState([]);

    /* Modal */
    const [visible, setVisible] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
            .then(response => response.json())
            .then(data => {
                setBeedSearch(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [id]);

    /* Fix data hasn't loaded yet */
    if (!beedSearch) return 'Loading...';

    return (
        <>
        <div className='relative min-h-[90vh] overflow-auto'>
            <div className='relative max-w-[50rem] min-h-[90vh] mx-auto my-[60px] p-[10px] box-border'>

                <div className='relative my-4'>

                    <div className='relative my-3 mx-1 py-2'>
                        <div className='relative flex justify-start items-center box-border'>
                            <div>
                                <Link to='/'>
                                    <span className='pi pi-angle-left p-2 rounded-full hover:bg-slate-200' style={{ fontSize: '1.25rem' }}></span>
                                </Link>
                            </div>
                            <div className='mx-2'>
                                <p className='text-sm'><span className='text-base'>{(beedSearch.length > 1) ? `${beedSearch.length} results` : `${beedSearch.length} result`}</span> for <span className='text-base font-semibold'>{id}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 md:gap-y-4'>
                        <div className='bg-slate-200'>
                            <img src={beedSearch[0]?.url} alt={id} onClick={() => setVisible(true)} className='w-full h-[220px] rounded-2xl object-cover cursor-pointer' />
                        </div>
                    </div>

                </div>

            </div>
        </div>
        
        {beedSearch[0]?.id &&
        <DialogModal visible={visible} setVisible={setVisible} id={beedSearch[0]?.id} />
        }
        </>
    )
}
