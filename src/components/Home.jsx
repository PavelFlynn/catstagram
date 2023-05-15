import { useEffect, useState } from 'react'
import { DialogModal } from './DialogModal';
import { Featured } from './';
import { Link } from 'react-router-dom';

export function Home() {

    const [feed, setFeed] = useState([]);
    const [breedList, setbreedList] = useState([]);
    
    /* Modal */
    const [visible, setVisible] = useState(false);
    const [catId, setCatId] = useState(null);

    const [historyList, setHistoryList] = useState([]);

    /* Call API */
    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/images/search?limit=10')
            .then(response => response.json())
            .then(data => {
                setFeed(data);
            })
            .catch(error => {
                console.log(error);
            })

        fetch('https://api.thecatapi.com/v1/breeds')
            .then(response => response.json())
            .then(data => {
                setbreedList(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    /* Local Storage */
    useEffect( () => {
        const localData = JSON.parse(localStorage.getItem('history'));
        if (localData) {
            setHistoryList(localData);
        }
    }, []);
    
    useEffect( () => {
        if (historyList.length > 0) localStorage.setItem('history', JSON.stringify(historyList));
    }, [historyList]);

    /* Set Id for Modal + Set Modal + Set LocalStorage Items */
    const catDialogDetails = (id) => {
        setCatId(id);
        setVisible(true);

        /* If Id already exists */
        const findItem = historyList.find(i => i.id == id);
        if (!findItem) {
            setHistoryList([...historyList, { id: id }]);
        }

        if (historyList) {
            localStorage.setItem('history', JSON.stringify(historyList));
        }
    }
    
    /* Fix data hasn't loaded yet */
    if (!feed) return 'Loading...';

    return (
        <>
        <div className='relative min-h-[90vh] overflow-auto'>
            <div className='relative max-w-[50rem] min-h-[90vh] mx-auto my-[60px] p-[10px] box-border'>

                <div className='relative mt-4 mb-6'>
                    <div className='relative overflow-auto whitespace-nowrap'>
                        {breedList.map(item => (
                        <div className='m-2 text-center inline-block align-middle' key={item.id}>
                            <Featured item={item} />
                        </div>
                        ))}
                    </div>
                </div>

                {historyList.length > 0 && (
                <div className='relative my-3 mx-1 py-1'>
                    <div className='relative flex justify-end items-center box-border'>
                        <div className='hidden md:block mx-1'>
                            <p className='text-sm font-semibold'>Your history</p>
                        </div>
                        <div className='hidden md:block'>
                            <Link to='/history'>
                                <span className='pi pi-angle-right p-1 rounded-full hover:bg-slate-200' style={{ fontSize: '1.25rem' }}></span>
                            </Link>
                        </div>
                        <div className='block md:hidden'>
                            <Link to='/history'>
                                <span className='pi pi-history p-3 text-slate-600 border border-slate-300 rounded-full' style={{ fontSize: '18px' }}></span>
                            </Link>
                        </div>
                    </div>
                </div>
                )}

                <div className='relative my-4'>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5 md:gap-y-4'>
                        {feed.map(item => (
                        <div className='bg-slate-200' key={item.id}>
                            <img src={item.url} alt="" onClick={() => catDialogDetails(item.id)}  className='w-full h-[220px] rounded-2xl object-cover cursor-pointer'/>
                        </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
        
        {catId &&
        <DialogModal visible={visible} setVisible={setVisible} id={catId} />
        }
        </>
    )
}
