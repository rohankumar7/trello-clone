import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Backdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    z-index:999;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
`
const Image = styled(motion.img)`
    display: flex;
    max-width: 90%;
    max-height: 70%;
    margin: 60px auto 0 auto;
    box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
`

function ImageModal({ setOpen, imageUrl, name }) {
    const backdropRef = React.useRef(null)
    const handleClick = (e) => {
        if (backdropRef.current === e.target)
            setOpen(false);
    }
    return (
        <Backdrop initial={{opacity : 0}} animate={{ opacity: 1 }} onClick={handleClick} ref={backdropRef}>
            <Image
                initial={{ scale: 0 }}
                animate={{ scale: 1.1 }}
                src={imageUrl} />
            <p style={{ fontWeight: '300', fontSize: '24px', textAlign: 'center', color: '#fff' }}>{name}</p>
        </Backdrop>
    )
}

export default ImageModal
