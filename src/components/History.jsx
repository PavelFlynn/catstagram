import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CatCard } from './';

export function History() {

    const [historyList, setHistoryList] = useState([]);

    /* Local Storage */
    useEffect( () => {
        const localData = JSON.parse(localStorage.getItem('history'));
        if (localData) {
            setHistoryList(localData);
        }
    }, []);

    const reset = () => {
        localStorage.clear();
        setHistoryList([]);
    }

    return (
        <div className='relative min-h-[90vh] overflow-auto'>
            <div className='relative max-w-[50rem] min-h-[90vh] mx-auto my-[60px] p-[10px] box-border'>

                <div className='relative my-4'>

                    <div className='relative my-3 mx-1 py-2'>
                        <div className='relative flex justify-between items-center box-border'>

                            <div className='relative flex justify-start items-center box-border'>
                                <div>
                                    <Link to='/'>
                                        <span className='pi pi-angle-left p-2 rounded-full hover:bg-slate-200' style={{ fontSize: '1.25rem' }}></span>
                                    </Link>
                                </div>
                                <div className='mx-2'>
                                    <p className='text-sm'><span className='text-base font-semibold'>{historyList.length}</span> History results.</p>
                                </div>
                            </div>

                            <div className='relative flex justify-start items-center box-border'>
                                <div className='hidden md:block'>
                                    <p className='text-sm cursor-pointer font-semibold opacity-60 hover:underline hover:opacity-100' onClick={reset}>Reset</p>
                                </div>
                                <div className='block md:hidden'>
                                    <span className='pi pi-trash p-3 text-slate-600 border border-slate-300 rounded-full cursor-pointer' style={{ fontSize: '18px' }} onClick={reset}></span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {historyList &&
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

                        {historyList.map(item => (
                        <div key={item.id}>
                            <CatCard item={item} />
                        </div>
                        ))}

                    </div>
                    }

                </div>

            </div>
        </div>
    )
}
