
export function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className='relative max-w-[50rem] mx-auto box-border'>

                <div className='relative py-4 text-center'>
                    <p className='text-xs text-slate-400'>Copyright © {currentYear} Catstagram All rights reserved.</p>
                </div>

            </div>
        </footer>
    )
}
