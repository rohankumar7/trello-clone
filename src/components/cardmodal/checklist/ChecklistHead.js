import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { deleteChecklists } from '../../../actions/checklistActions'
import { addActivities } from '../../../actions/activityActions'
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
width:auto;
min-width:40px;
min-height:18px;
display:inline-block;
`
const Delete = styled.div`
font-size:14px;
line-height:20px;
text-align:center;
color:#091e42;
float:right;
font-weight:400;
background:#eaecef;
width:auto;
margin:8px 0 0 0;
padding:6px 12px;
border:none;
border-radius:3px;
cursor:pointer;
&:hover{
    background:#e1e4e9;
}
`
const RowFlex = styled.div`
display: flex;
width:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
`
const ProgressBar = styled.div`
height:8px;
width:${props => props.percent};
border-radius:9px;
background:${props => props.percent === '100%' ? '#61bd4f' : '#0079bf'};
transition:.2s ease-in-out;
`
const OuterProgress = styled.div`
height:auto;
width:100%;
border-radius:9px;
background:#e0e3e8;
`
const Percent = styled.div`
font-size:11px;
min-width:32px;
max-width:auto;
color:#71909a;
margin:0 8px 0 0;
text-align:center;
`

function ChecklistHead({name,percent,id,cardID}) {
    const dispatch = useDispatch()
    
    const DeleteChecklist = id =>{
        dispatch(deleteChecklists(id,cardID))
        const text = `deleted ${name} from this card.`
        const activity = { 
          id:`activity-${Date.now()}`, 
          type:'log',
          name:'Rohan Kumar',
          text,
          time: new Date()
        }
        dispatch(addActivities(activity.id,cardID,activity))
    }
    return (
        <div>
            <RowFlex>
                <IconSpan>
                    <CheckBoxOutlinedIcon />
                </IconSpan>
                <div style={{ width: '100%' }}>
                    <Title>{name}</Title>
                    <Delete onClick={()=>DeleteChecklist(id)}>Delete</Delete>
                </div>
            </RowFlex>
            <RowFlex>
                <Percent percent={percent}>{`${percent}%`}</Percent>
                <OuterProgress>
                    <ProgressBar percent={`${percent}%`}></ProgressBar>
                </OuterProgress>
            </RowFlex>
        </div>
    )
}

export default ChecklistHead
