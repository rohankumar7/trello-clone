import React from 'react'
import styled from 'styled-components'
import { usePalette } from 'react-palette'
import ImageModal from '../ImageModal'

const Container = {
    position: 'absolute',
    height: '180px',
    top: '0',
    left: '0',
    width: '100%',
}
const ImgCont = styled.div`
background: ${props => props.bgColor};
position:absolute;
height:auto;
display:flex;
height:150px;
justify-content:center;
align-items:center;
width:100%;
z-index:9;
cursor:${props => props.type !== 'color' ? 'pointer' : 'auto'};
`

export default function Cover({ cover }) {
    
    
    const [modalOpen, setModalOpen] = React.useState(false)
    const { data, loading, error } = usePalette(cover.link)
    return (
        <>
            {
                modalOpen &&
                <ImageModal setOpen={setModalOpen} imageUrl={cover.link} name={''} />
            }
            {Object.entries(cover).length !== 0 && <>
                {
                    cover.link !== '' &&
                    <div style={Container}>
                        <ImgCont bgColor={data.vibrant} onClick={() => setModalOpen(true)}>
                            {<img src={cover.link} alt={'cover'} height={150} />}
                        </ImgCont>
                    </div>
                }
                {
                    cover.color !== '' &&
                    <div style={Container}>
                        <ImgCont bgColor={cover.color} type={'color'}>
                        </ImgCont>
                    </div>
                }
                <div style={{ position: 'relative', height: '150px' }}></div></>
            }
        </>
    )
}
