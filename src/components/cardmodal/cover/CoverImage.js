import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

const InputLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 2px;
`;
const BorderWhite = styled.div`
border : 2px solid #fff;
border-radius: 3px;
`
const BorderBlue = styled.div`
border:${props => props.select ? '2px solid #0079bf' : '2px solid #fff'};
border-radius: 6px;
margin:1px;
`
const AttachDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
flex-wrap:wrap;
padding:8px 0;
`
const AttachImage = styled.div`
height:50px;
width:96px;
border-radius:3px;
background-image:${props => props.link ? `url(${props.link})` : ''};
background-position : center;
background-size: contain;
background-repeat: no-repeat;
cursor:pointer;
`

export default function CoverImage({ cardID }) {

    const dispatch = useDispatch()

    const attachments = useSelector(state => state.attachments)
    const cards = useSelector(state => state.cards)
    const card = cards.find(card => card.id === cardID)
    const attachmentOrder = card.attachments
    const cover = card.cover

    const cardAttachment = attachmentOrder.map(attachID => {
        const attachment = attachments.find(attach => attach.id === attachID)
        if (attachment) return attachment
    }).map(attacment => ({ ...attacment, selected: false }))

    const [currentImage, setCurrentImage] = useState(cover.link)
    const [images, setImages] = useState(cardAttachment)

    useEffect(() => {
        if (cover.link) {
            setCurrentImage(cover.link)
        }
    }, [cover])

    React.useEffect(() => {
        setImages(
            images.map((image) => {
                if (image.link === currentImage) image.selected = true;
                return image;
            })
        );
    }, [cover]);

    function currentImageFunc(link) {
        setImages(images.map((data) => (data.selected = false)))
        setImages(
            images.map((data) => {
                if (link === data.link) {
                    data.selected = !data.selected
                }
                return data
            })
        )
        setCurrentImage(link)
        imageCover(link)
    }
    const imageCover = (link) => {
        const cover = {
            link,
            color: ''
        }
        dispatch({
            type: 'EDIT_COVER',
            payload: { cardID, cover }
        })
    }
    return (
        <div>
            <InputLabel>ATTACHMENTS</InputLabel>
            {
                cover.link !== '' ? <AttachDiv>
                    {
                        images.map(image => {
                            return (
                                <BorderBlue key={image.id} select={image.selected}>
                                    <BorderWhite>
                                        <div onClick={() => { currentImageFunc(image.link) }}
                                            style={{ background: '#719091', borderRadius: '3px' }}>
                                            <AttachImage link={image.link} />
                                        </div>
                                    </BorderWhite>
                                </BorderBlue>
                            )
                        })
                    }
                </AttachDiv> : <AttachDiv>
                        {
                            images.map(image => {
                                return (
                                    <BorderBlue key={image.id} select={false}>
                                        <BorderWhite>
                                            <div onClick={() => { currentImageFunc(image.link) }}
                                                style={{ background: '#719091', borderRadius: '3px' }}>
                                                <AttachImage link={image.link} />
                                            </div>
                                        </BorderWhite>
                                    </BorderBlue>
                                )
                            })
                        }
                    </AttachDiv>
            }
        </div>
    );
}
