import React from 'react'
import styled from "styled-components"
import SubjectIcon from '@material-ui/icons/Subject'

const Container = styled.div`
position: relative;
height:100%;
width:100%;
margin:0 0 8px 0;
`
const IconSpan = styled.span`
text-align:center;
height:32px;
color:#42526e;
justify-content:center;
display:flex;
width:32px;
margin-right: 8px;
vertical-align:bottom;
word-spacing : 0px;
align-items:center;
`
const Title = styled.h3`
font-size:16px;
color:#172b4d;
font-weight:600;
line-height:20px;
height:20px;
width:83px;
min-width:40px;
min-height:18px;
display:block;
`
const ContainerPadding = styled.div`
padding: 0 16px 0 40px;
@media(max-width:960px){
    padding:0 0 0 8px;
  }
`
const flexStart = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
}

const DescP = styled.p`
font-size:14px;
line-height:20px;
word-spacing:0px;
color:#172b4d;
min-height:20px;
height:auto;
width:100%;
padding:0;
margin:0 0 8px 0;
word-break:break-all;
white-space:pre-wrap;
hyphens:auto;
`

export default function Description({ description }) {
    return (
        <div>
            <Container>
                <div style={flexStart}>
                    <IconSpan><SubjectIcon /></IconSpan>
                    <Title>Description</Title>
                </div>
                    <ContainerPadding>
                        <DescP>{description}</DescP>
                    </ContainerPadding>
            </Container>
        </div>
    )
}
