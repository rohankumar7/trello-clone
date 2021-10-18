import React from 'react'
import styled from 'styled-components'
import { usePalette } from 'react-palette'
import CoverModal from './CoverModal'
import VideoLabelOutlinedIcon from '@material-ui/icons/VideoLabelOutlined';
import ImageModal from '../ImageModal'

const IconSpan = styled.div`
display:flex;
justify-content:center;
font-size:14px;
align-items:center;
position : absolute;
height : 20px;
font-weight:400;
padding:6px 12px;
border-radius:3px;
color:#fff;
background:rgba(255, 255, 255, 0.3);
right: 8px;
bottom:38px;
cursor:pointer;
z-index:10;
`
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

export default function Cover({ cover, open, handleOpen, handleClose, cardID }) {
    
    
    const [modalOpen, setModalOpen] = React.useState(false)
    const { data, loading, error } = usePalette(cover.link)
    return (
        <>
                <CoverModal cover={cover} open={open} handleClose={handleClose} cardID={cardID} />
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
                        <IconSpan onClick={handleOpen}><VideoLabelOutlinedIcon style={{ fontSize: '14px', margin: '0 6px 0 0' }} /> Cover</IconSpan>
                    </div>
                }
                {
                    cover.color !== '' &&
                    <div style={Container}>
                        <ImgCont bgColor={cover.color} type={'color'}>
                        </ImgCont>
                        <IconSpan onClick={handleOpen}><VideoLabelOutlinedIcon style={{ fontSize: '14px', margin: '0 6px 0 0' }} /> Cover</IconSpan>
                    </div>
                }
                <div style={{ position: 'relative', height: '150px' }}></div></>
            }
        </>
    )
}
