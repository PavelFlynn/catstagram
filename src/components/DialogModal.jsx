import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

export function DialogModal( { visible, setVisible, id } ) {

    const [catInfo, setCatInfo] = useState(null);

    useEffect(() => {
        fetch(`https://api.thecatapi.com/v1/images/${id}`)
            .then(response => response.json())
            .then(data => {
                setCatInfo(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [id]);

    /* Fix data hasn't loaded yet */
    if (!catInfo) return 'Loading...';

    // name: catInfo.breeds[0].name || catInfo.categories?.name
    // image: catInfo.url
    // description: catInfo.breeds?.description

    return (
        <div className='cat-dialog'>
            <Dialog header={catInfo?.breeds?.categories?.name} visible={visible} onHide={() => setVisible(false)} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <div>
                    <img src={catInfo.url} alt='' className='w-full h-auto rounded-lg' />
                </div>
                <div className='my-2 mx-1'>
                    <p>{ catInfo?.breeds?.description ? catInfo?.breeds?.description : 'No information available at the moment, we are working on it =)' }</p>
                </div>
            </Dialog>
        </div>
    )
}
