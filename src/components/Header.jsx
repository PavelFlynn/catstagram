import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {

    const [breedList, setbreedList] = useState([]);
    const [breed, setbreed] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/breeds')
            .then(response => response.json())
            .then(data => {
                setbreedList(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handleSelection = (event) => {
        setbreed(event.target.value.id);
    }

    useEffect( () => {
        if (breed) {
            navigate(`/search/${breed}`);
            setbreed('');
        }
    }, [breed, navigate]);

    /* Fix data hasn't loaded yet */
    if (!breedList) return 'Loading...';

    return (
        <header className='z-10 fixed w-full bg-white'>
            <div className='relative max-w-[50rem] mx-auto px-3 box-border'>
                <div className='relative flex justify-between items-center h-[60px] box-border'>

                    <div>
                        <Link to='/'>
                        <div className='relative flex justify-start items-center box-border'>
                            <img src='../../cat.svg' alt='cat' className='w-[45px] h-auto md:w-[42px]' />
                            <img src='../../catstagram.svg' alt='Catstagram' className='hidden md:block w-auto h-[25px] mx-2' />
                        </div>
                        </Link>
                    </div>

                    <div className='cat-dropdown'>
                        <form action=''>
                            <Dropdown 
                                value={breed} 
                                onChange={handleSelection} 
                                options={breedList}
                                optionLabel='name'
                                placeholder='Select breed'
                            />
                        </form>
                    </div>

                </div>
            </div>
        </header>
    )
}
